window.onload = init;
function init() {
    document.querySelector('#search')
        .addEventListener('click', githubUserSearch, false);
}
function githubUserSearch() {
    let userName = document.querySelector('#searchUser').value;
    let userUrl = 'https://api.github.com/users/' + userName;
    let repoUrl = 'https://api.github.com/users/' + userName + '/repos';
    let userXHR = new XMLHttpRequest();
    userXHR.open('GET', userUrl, true);
    userXHR.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    userXHR.onload = function () {
        let repoXHR = new XMLHttpRequest();
        repoXHR.open('GET', repoUrl, true)
        repoXHR.onload = function () {
            let commitXHR = new XMLHttpRequest();
            let repos = JSON.parse(repoXHR.responseText);
            let reposName = repos.map(repo => repo.name)
            console.log(repos);
            let html = '';
            for (const value in repos) {
                const repoName = repos[value].name;
                const repoDescription = repos[value].description;
                const repoLanguage = repos[value].language;
                const reposStargazersCount = repos[value].stargazers_count;
                const reposForksCount = repos[value].forks_count

                html += `<li class="repoListItem">
                <a class="reposName">${repoName}</a>
                <p class="reposDescription">${repoDescription}</p>
                <span class="repoInfo"><i class="fa fa-code" aria-hidden="true"></i> ${repoLanguage}</span>
                <a class="repoInfo"><i class="fa fa-star" aria-hidden="true"></i> ${reposStargazersCount}</a>
                <a class="repoInfo"><i class="fa fa-code-fork" aria-hidden="true"></i> ${reposForksCount}</a>
                </li>`
            }
            document.querySelector('#reposList').innerHTML = html;
            for (let i = 0; i < reposName.length; i++) {
                commitXHR.open('GET', 'https://api.github.com/repos/' + userName + '/' + reposName[i] + '/commits', true);
            }           
            commitXHR.onload = function () {
                let committersInfo = JSON.parse(commitXHR.responseText)
                console.log(committersInfo)
                let html = '';
                for (const value in committersInfo) {
                    let committersName = committersInfo[value].committer.login;
                    let committersImgUrl = committersInfo[value].committer.avatar_url;                   
                    html += `
                    <li class="committerItem">
                    <img class="committerImg" src ="${committersImgUrl}" alt="there is no img"/>
                    <a>${committersName}</a>
                    </li>`;
                }
                document.querySelector('#committersList').innerHTML = html;
                //console.log(committerName);
            }
            commitXHR.send();
        }
        repoXHR.send();
        let user = JSON.parse(userXHR.responseText);
        console.log(user);
        if (userXHR.readyState == 4 && userXHR.status == "200") {
            const template = `<div class="userCard">
            <p class= userCardHeader>User Profile</p>
            <a href="${user.html_url}" target="_blank"><img src ="${user.avatar_url} alt="${user.name}"/></a>
            <p ><i class="fa fa-user userName" aria-hidden="true"></i> ${user.name}</p>
            <p class="title"><i class="fa fa-building-o" aria-hidden="true"></i> ${user.company}</p>
            <p class="title"><i class="fa fa-tag" aria-hidden="true"></i> ${user.bio}</p>
            <p class="title"><i class="fa fa-map-marker" aria-hidden="true"> ${user.location}</i></p>
            <a href="${user.html_url}" target="_blank"><button>View full profile</button></a>
            </div>
            `;
            document.querySelector('#user').innerHTML = template;
        }
    };

    userXHR.send();
}