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
    .then(res => res.json());