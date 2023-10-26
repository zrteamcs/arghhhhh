require("./config")
const cluster = require("cluster");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const { handleUnhandledRejection, handleUncaughtException } = require("./lib/fix");
const { fnctions } = require("./lib/fnctions");
const moment = require("moment");
const chokidar = require("chokidar");

const PORT = process.env.PORT || 8080;

process.on("unhandledRejection", handleUnhandledRejection);
process.on("uncaughtException", handleUncaughtException);

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

if (cluster.isMaster) {
  const watcher = chokidar.watch("plugins", {
    ignored: /(^|[\/\\])\../,
    persistent: true,
  });

  watcher.on("change", async (path) => {
    console.log(`File ${path} berhasil di ganti, sedang restarting...`);

    try {
      const originalCode = fs.readFileSync(path, "utf8");
      fs.writeFileSync(path, originalCode, "utf8");
      console.log(`File ${path} berhasil di perbaiki otomatis.`);

      cluster.worker.send("reset");
    } catch (error) {
      console.error(`Terjadi kesalahan dan restarting ${path}:`, error);
    }
  });

  console.log(
    `\x1b[33mâ—¦ Cluster Master \x1b[37m(Id ${process.pid})\x1b[33m is running\x1b[0m`
  );

  for (let i = 0; i < (process.env.CLUSTER_COUNT || 1); i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `\x1b[31mâ—¦ Worker \x1b[37m(Id ${worker.process.pid})\x1b[31m died\x1b[0m`
    );
    cluster.fork();
  });
} else {
  start("main.js");
}

var isRunning = false;

async function start(file) {
  if (isRunning) return;

  try {
    if (!(await fnctions())) return;

    isRunning = true;
    var args = [path.join(__dirname, file), ...process.argv.slice(2)];
    var p = spawn(process.argv[0], args, {
      stdio: ["inherit", "inherit", "pipe", "ipc"],
    });

    let errorStack = "";

    p.stderr.on("data", (data) => {
      errorStack += data.toString();
    });

    p.on("message", (data) => {
      console.log("[ Dann ]", data);
      switch (data) {
        case "reset":
          p.kill();
          isRunning = false;
          start.apply(this, arguments);
          break;
        case "uptime":
          p.send(process.uptime());
          break;
      }
    });

    p.on("exit", (code) => {
      isRunning = false;
      console.error("Exited with code:", code);

      if (code !== null) {
        const now = moment().format("YYYY-MM-DD_HH-mm-ss");
        const logFileName = `error_log_${now}.txt`;
        const logFilePath = path.join(__dirname, logFileName);

        const logContent = `
          ===== Error Log - ${now} =====
          Exit Code: ${code}
          Error Stack: ${errorStack || "No error stack available"}
          ===============================
        `;

        fs.writeFile(logFilePath, logContent, (err) => {
          if (err) console.error("Error writing log file:", err);
          console.log("Error log saved to:", logFileName);
        });

        fs.watchFile(args[0], () => {
          fs.unwatchFile(args[0]);
          fs.writeFile(logFilePath, logContent, (err) => {
            if (err) console.error("Error writing log file:", err);
            console.log("Error log saved to:", logFileName);
          });
          start(file);
        });
      } else {
        console.log("Exited with code: null. Restarting...");
        start("main.js");
      }
    });

    console.log(`${namebot} server is running on port ${PORT}`);
  } catch (e) {
    console.error("Terjadi kesalahan:", e);
  }
}