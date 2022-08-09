const apiUrl = `http://api.github.com`;
const id = `f978fc4f62ea603142aa`;
const clientSecret = `7616e671c9a72e87ef7380e68ec1a876ac3322e5`;
const input = document.getElementById("inputuser");
const button = document.querySelector("button");
const img = document.querySelector("img");
const userImg = document.getElementById("userImg");
async function getApi() {
  const users = `/users/${input.value}`;
  const resId = `/repos?client_id=${id}`;
  const cliSec = `&client_secret=${clientSecret}`;
  const userName = document.getElementById("username");
  try {
    userName.textContent = input.value;
    const response = await fetch(apiUrl + users + resId + cliSec);
    const data = await response.json();
    if (!response.ok)
      throw new Error(alert(`keine Daten unter ${input.value} gefunden!`));
    input.value = "";

    if (data.length > 1) {
      const githubResult = document.getElementById("result");
      githubResult.textContent = "";
      data.map((x, index) => {
        const todayDateToArr = new Date().toLocaleDateString().split("/");
        console.log(todayDateToArr);

        const repoDateToArr = new Date(x.pushed_at)
          .toLocaleDateString()
          .split("/");
        const repoDate = todayDateToArr - repoDateToArr[index];
        console.log(repoDateToArr);
        console.log(repoDate);
        if (index == 0) {
          img.src = x.owner.avatar_url;
          img.style.width = "6rem";
          img.style.height = "6rem";
          img.style.borderRadius = "100%";
        }
        githubResult.innerHTML += `
      <a href="${x.clone_url}" class="btn btn-outline-warning p-2 text-gray rounded-3 mt-3 d-flex justify-content-start">  
      <div class="d-flex flex-column align-items-start">
      <p class="repName">${x.name}</p>
      <span>${x.description}</span>
      <time-ago> ${x.pushed_at}</time-ago>
      </div></a>
        `;
      });
    } else {
      alert("enter Github Username");
    }
  } catch (error) {
    console.log(error);
  }
}

button.addEventListener("click", (event) => {
  event.preventDefault();
  getApi();
});
