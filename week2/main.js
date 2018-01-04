window.onload = init;

function init() {
    document.querySelector('#search')
        .addEventListener('click', githubUserSearch, false);
}
function handle(e) {
    if (e.keyCode === 13) {
        e.preventDefault(); 
        githubUserSearch();
    }
};
// search for users
function githubUserSearch() {
    let userName = document.querySelector('#searchUser').value;
    let userUrl = 'https://api.github.com/users/' + userName;
    let repoUrl = 'https://api.github.com/users/' + userName + '/repos';
    getUser(userUrl, function (user) {
        console.log(user);
        userInfo(user, userName)

    });
    getUserRepos(repoUrl, function (repos) {
        console.log(repos);
        repoInfo(repos)
        for (let i = 0; i < repos.length; i++) {
            const reposName = repos[i].name;
            getCommitters(reposName, userName, function (commits) {
                console.log(commits);
                commitInfo(commits)
            });
        }
    });
}
// Binding userInfo to the DOM
function userInfo(user) {
    let html = '';
    html += `<div class="userCard">
            <p class= userCardHeader>User Profile</p>
            <a href="${user.html_url}" target="_blank"><img src ="${user.avatar_url} alt="${user.name}"/></a>
            <p class="repoUserName"><i class="fa fa-user userName" aria-hidden="true"></i> ${user.name}</p>
            <p class="title"><i class="fa fa-building-o" aria-hidden="true"></i> ${user.company}</p>
            <p class="title"><i class="fa fa-tag" aria-hidden="true"></i> ${user.bio}</p>
            <p class="title"><i class="fa fa-map-marker" aria-hidden="true"> ${user.location}</i></p>
            <a href="${user.html_url}" target="_blank"><button>View full profile</button></a>
            </div>
            `;
    document.querySelector('#user').innerHTML = html;
}

// Binding reposInfo to the DOM

function repoInfo(repos) {
    let html = '';
    for (const value in repos) {
        const reposName = repos[value].name;
        const repoDescription = repos[value].description;
        const repoLanguage = repos[value].language;
        const reposStargazersCount = repos[value].stargazers_count;
        const reposForksCount = repos[value].forks_count
        html += `<li id="${reposName}" class="reposListItem">
                <a class="reposName">${reposName}</a>
                <p class="reposDescription">${repoDescription}</p>
                <span class="repoInfo"><i class="fa fa-code" aria-hidden="true"></i> ${repoLanguage}</span>
                <a class="repoInfo"><i class="fa fa-star" aria-hidden="true"></i> ${reposStargazersCount}</a>
                <a class="repoInfo"><i class="fa fa-code-fork" aria-hidden="true"></i> ${reposForksCount}</a>
                </li>`
    }
    document.querySelector('#reposList').innerHTML = html;
}
// Binding commitInfo to the DOM
function commitInfo(commits) {
    console.log(commits);
    let html = '';
    let committer = commits.commits[0].committer;
    if (committer !== null) {
        let committerName = committer.login;
        let imgUrl = committer.avatar_url;
        html += `<p class="committerBy"><i class="fa fa-commenting" aria-hidden="true"></i>Recent committers</p>
     <i class="fa fa-user" aria-hidden="true"></i> <a class="committerHtml" href="${committer.html_url}" target="_blank" >${committerName}</a>
        <a href="${committer.html_url}" target="_blank"><img class="committerImg" src ="${imgUrl}"/></a>`
        let div = document.createElement('div');
        div.setAttribute('class', 'committers')
        div.innerHTML = html;
        document.getElementById(commits.reposName).appendChild(div);
    }
}
//Get User
function getUser(userUrl, callback) {
    let userXHR = new XMLHttpRequest();
    userXHR.open('GET', userUrl, true);
    userXHR.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    userXHR.responseType = 'json';
    userXHR.onload = function () {
        if (userXHR.status == 200) {
            callback(userXHR.response);
        }
    }
    userXHR.send()
}
//Get Repositories
function getUserRepos(repoUrl, callback) {
    let repoXHR = new XMLHttpRequest();
    repoXHR.open('GET', repoUrl, true);
    repoXHR.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    repoXHR.responseType = 'json';
    repoXHR.onload = function () {
        if (repoXHR.status == 200) {
            callback(repoXHR.response);
        }
    }
    repoXHR.send();
}
// Get committers
function getCommitters(reposName, userName, callback) {
    let commitUrl = 'https://api.github.com/repos/' + userName + '/' + reposName + '/commits';
    let committerXHR = new XMLHttpRequest();
    committerXHR.open('GET', commitUrl, true);
    committerXHR.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    committerXHR.responseType = 'json';
    committerXHR.onload = function () {
        if (committerXHR.status == 200) {
            callback({
                reposName,
                commits: committerXHR.response
            });
        }
    }
    committerXHR.send()
}