let setTokenInLocalStorage = (userInfo) => {
    let token = userInfo.token;
    localStorage.setItem('token', token);
    return userInfo;
}

export let fetchCreateAccount = (input) =>
    fetch('http://localhost:5000/createaccount', {
        method: "POST",
        body: JSON.stringify(input),
        headers: new Headers ({
            "Content-Type": "application/json",
            })
    })
    .then(res => res.text());

export let fetchSignIn = (input) =>
    fetch('http://localhost:5000/signin', {
        method: "POST",
        body: JSON.stringify(input),
        headers: new Headers ({
            "Content-Type": "application/json",
            })
    })
    .then(res => res.json())
    .then(res => setTokenInLocalStorage(res));

export let fetchUserObject = (token) =>
fetch('http://localhost:5000/user', {
    method: "GET",
    headers: new Headers ({
        "Content-Type": "application/json",
        "Authorization": token
        })
    })
    .then(res => res.json())