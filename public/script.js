const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

//タスクを全て表示する
// /api/v1/tasksからタスクを読み込む
const showTasks = async () => {
  try {
    const { data: tasks } = await axios.get("/api/v1/tasks");
    //タスクが1つもない時
    if (tasks.length < 1) {
      tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`;
      return;
    }

    //タスクを出力
    const allTasks = tasks
      .map((task) => {
        const { completed, _id, name } = task;
        return `
            <div class="single-task">
            <h5><span><i class="far fa-check-circle"></i></span>
                ${name}</h5>
            <div class="task-links">
                <!-- 編集リンク -->
                <a href="#" class="edit-link">
                    <i class="fas fa-edit"></i>
                </a>
                <!-- ゴミ箱リンク -->
                <button type="button" class="delete-btn" data-id="${_id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            </div>`;
      })
      .join("");
    tasksDOM.innerHTML = allTasks;
  } catch (err) {
    console.log(err);
  }
};

showTasks();

//タスクを新規作成する
formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = taskInputDOM.value;

  try {
    //データを投稿
    await axios.post("/api/v1/tasks", { name: name });
    //データを表示
    showTasks();
    //フォームの中身を空にする
    taskInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "タスクを追加しました";
    formAlertDOM.classList.add("text-success");
  } catch (err) {
    console.log(err);
    formAlertDOM.style.display = "block";
    //20文字以上打ち込んだ場合のエラー
    formAlertDOM.innerHTML = "無効です。もう一度やり直してください。";
  }
  //3秒後にエラーメッセージを消す
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});

//タスクを削除する
tasksDOM.addEventListener("click", async (e) => {
  //クリックした特定の要素を取得
  const element = e.target;
  //delete-btnのクラスを持つ要素が含めれる親要素だった場合
  if (element.parentElement.classList.contains("delete-btn")) {
    //データのidを取得
    const id = element.parentElement.dataset.id;
    try {
      //データを削除
      await axios.delete(`/api/v1/tasks/${id}`);
      //データ削除を踏まえた全てのデータを表示
      showTasks();
    } catch (err) {
      console.log(err);
    }
  }
});
