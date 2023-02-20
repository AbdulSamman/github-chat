

const apiUrl = `http://api.github.com`;
const id = myKeys.GT_ID;
const clientSecret = myKeys.GT_SECRET;
const input = document.getElementById("inputUser");
const button = document.querySelector("button");
const img = document.querySelector("img");
//const userImg = document.getElementById("userImg");

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
        const date = new Date().toLocaleDateString("de-DE").split(".");
        console.log(date);
        const repoDate = new Date(x.pushed_at)
          .toLocaleDateString("de-DE")
          .split(".");
        console.log(repoDate);

        let dateResult = date.map((ele, i) => {
          return ele - repoDate[i];
        });
        // if (dateResult[0] == 0) {
        //   dateResult[0] = "yes";
        // }

        const sumOfNull = dateResult.reduce((acc, cur) => acc + cur);
        if (sumOfNull === 0) {
          githubResult.innerHTML = "updated";
        }
        console.log(sumOfNull);
        const repoDateToArr = new Date(x.pushed_at).toLocaleString("de-DE");

        console.log("result", dateResult);

        if (index == 0) {
          img.src = x.owner.avatar_url;
          img.style.width = "6rem";
          img.style.height = "6rem";
          img.style.borderRadius = "100%";
        }
        githubResult.innerHTML += `
      <a href="${x.clone_url}" class="btn btn-outline-warning p-2 text-gray rounded-3 mt-3 d-flex justify-content-between">
     
      <div class="d-flex flex-column align-items-start">
      <p class="repName">${x.name}</p>
    
      <span>${x.description}</span>
   
      <time-ago> ${repoDateToArr}</time-ago>
      </div>
      <span>
      ${dateResult}
      </span>
      </a>
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
