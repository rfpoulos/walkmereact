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
            "Content-Type": "application/json"
            })
    })
    .then(res => res.text());

export let postProfilePicture = (data, token) => {
    let formData = new FormData();
    formData.append('thumbnail', data);
    return fetch('http://localhost:5000/postprofilepic', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: new Headers ({
        "authorization": localStorage.getItem('token') 
            })
    }).then(res => res.text());
}

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
        "authorization": localStorage.getItem('token') 
        })
    })
    .then(res => res.json())

export let postInitialWalk = (input) =>
    fetch('http://localhost:5000/postwalk', {
        method: "POST",
        body: JSON.stringify(input),
        headers: new Headers ({
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token')
            })
    })
    .then(res => res.json());

export let postWalkThumbnail = (id, data) => {
    let formData = new FormData();
    formData.append('walk-thumbnail', data);
    formData.append('id', id)
    return fetch('http://localhost:5000/postwalkthumbnail', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: new Headers ({
        "authorization": localStorage.getItem('token') 
            })
    }).then(res => res.text());
}

export let postWalkAudio = (id, data) => {
    let formData = new FormData();
    formData.append('walk-audio', data);
    formData.append('id', id)
    return fetch('http://localhost:5000/postwalkaudio', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: new Headers ({
        "authorization": localStorage.getItem('token') 
            })
    }).then(res => res.text());
}

export let postWalkVideo = (id, data) => {
    let formData = new FormData();
    formData.append('walk-video', data);
    formData.append('id', id)
    return fetch('http://localhost:5000/postwalkvideo', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: new Headers ({
        "authorization": localStorage.getItem('token') 
            })
    }).then(res => res.text());
}

export let postPoi = (input) =>
    fetch('http://localhost:5000/postpoi', {
        method: "POST",
        body: JSON.stringify(input),
        headers: new Headers ({
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token')
            })
    })
    .then(res => res.json());

export let updatePoiPositions = (pois) =>
    fetch('http://localhost:5000/updatepoipositions', {
        method: "POST",
        body: JSON.stringify(pois),
        headers: new Headers ({
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token')
        })
    }).then(res => res.text());

export let fetchUserLocation = () =>
    fetch(`https://www.googleapis.com/
            geolocation/v1/geolocate?
            key=AIzaSyBfiseqKd83EqCDMVV4nKwH_7-js_Nv7VU`,
        {
            method: 'POST'
        })
        .then(res => res.json())