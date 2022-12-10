let theInput = document.querySelector("input");
let button = document.querySelector(".btn");
let reposData = document.querySelector(".show-data");

window.onload = function () {
  theInput.focus();
};


button.addEventListener("click", () => {
  getRepos();
});

function getRepos() {
  if (theInput.value == "") {
    reposData.innerHTML = "<span>Please Write Github Username.</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => response.json())
      .then((data) => {
        reposData.innerHTML = '';
        data.forEach(repo => {
          let mainDiv = document.createElement("div");
          let title = document.createElement("p");
          title.className = "title";
          let titleText = document.createTextNode(repo.name);
          title.appendChild(titleText);
          mainDiv.appendChild(title);


          let theUrl = document.createElement('a');
          let theUrlText = document.createTextNode("Visit");
          theUrl.appendChild(theUrlText);
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
          theUrl.setAttribute('target', '_blank');
          mainDiv.appendChild(theUrl);


          let starsSpan = document.createElement("span");
          let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);
          starsSpan.appendChild(starsText);
          mainDiv.appendChild(starsSpan);
          mainDiv.className = 'repo-box';
          reposData.appendChild(mainDiv);

        });
      });
    }
}