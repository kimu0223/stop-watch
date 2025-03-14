'use strict';

// 変数を作る
let startTime; // スタート時刻
let elapsedTime = 0; // 経過時間
let timerId; // setInterval を格納
let isRunning = false; // タイマーの状態を管理

// スタートボタンの処理
document.getElementById("start").addEventListener("click", function () {
  if (!isRunning) { // すでに作動中なら何もしない
    startTime = Date.now() - elapsedTime;
    timerId = setInterval(updateTime, 10);
    isRunning = true;
  }
});

// ストップボタンの処理
document.getElementById("stop").addEventListener("click", function () {
  clearInterval(timerId);
  isRunning = false;
});

// リセットボタンの処理
document.getElementById("reset").addEventListener("click", function() { // `rest` → `reset`
  clearInterval(timerId);
  elapsedTime = 0;
  document.getElementById("time").textContent = "00:00:00"; // 表示のフォーマット修正
  isRunning = false;
});

// 時間を更新する関数
function updateTime() {
  const now = Date.now();
  elapsedTime = now - startTime;

  let milliseconds = Math.floor((elapsedTime % 1000) / 10);
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let minutes = Math.floor((elapsedTime / 1000 / 60) % 60);

  // 2桁表示にする
  document.getElementById("time").textContent =
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + ":" +
    String(milliseconds).padStart(2, "0");
}

// ラップボタンの処理
document.getElementById("lap").addEventListener("click", function() {
  const lapTime = document.getElementById("time").textContent; // `textcontent` → `textContent`
  const lapRecord = document.createElement("p"); // `lapRecord` を作成
  lapRecord.textContent = "ラップ: " + lapTime; // `textcontent` → `textContent`
  document.body.appendChild(lapRecord); // ページに追加
});
