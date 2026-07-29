<input type="file" id="photo">

  <button onclick="upload()">

    Upload Test2410

  </button>

  <div id="result" style="margin-top:20px;"></div>



  <script>
    function upload(){

    const file=document.getElementById("photo").files[0];

    if (!file) {
      alert("請先選擇圖片");
    return;
        }

    const reader=new FileReader();

    reader.onload=function(e){

      google.script.run

        .withSuccessHandler(function (r) {
          document.getElementById("result").innerHTML = `
                <p>上傳成功！</p>

                <input type="text"
                      id="imageUrl"
                      value="${r.url}"
                      style="width:100%;margin-bottom:8px;"
                      readonly>

                <button onclick="copyUrl()">
                    📋 複製網址
                </button>

                <br><br>

                <img src="${r.url}" style="max-width:300px;">
          `;

        })

        .upload(
          file.name,
          e.target.result
        );

    };

    reader.readAsDataURL(file);
}

    function copyUrl() {

const url = document.getElementById("imageUrl").value;

    navigator.clipboard.writeText(url)
  .then(() => {
      alert("網址已複製！");
  })
  .catch(() => {
    // 相容舊版瀏覽器
    const input = document.getElementById("imageUrl");
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("網址已複製！");
  });
}

  </script>