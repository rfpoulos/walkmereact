import { server } from './variables'; 

let setTokenInLocalStorage = (userInfo) => {
    let token = userInfo.token;
    localStorage.setItem('token', token);
    return userInfo;
}

export let fetchCreateAccount = (input) =>
    fetch(server + '/createaccount', {
        method: "POST",
        body: JSON.stringify(input),
        headers: new Headers ({
            "Content-Type": "application/json",
            })
    })
    .then(res => res.text());

export let postProfilePicture = (data, token) => {
    let formData = new FormData();
    formData.append('thumbnail', data);
    return fetch(server + '/postprofilepic', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: new Headers ({
        "authorization": localStorage.getItem('token') 
            })
    }).then(res => res.text());
}

export let postUserLocation = (input) =>
    fetch(server + '/userlocation', {
        method: "POST",
        body: JSON.stringify(input),
        headers: new Headers ({
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token') 
            })
    })
    .then(res => res.json());

export let postUserAboutMe = (input) =>
    fetch(server + '/useraboutme', {
        method: "POST",
        body: JSON.stringify(input),
        headers: new Headers ({
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token') 
            })
    })
    .then(res => res.json());

export let fetchSignIn = (input) =>
    fetch(server + '/signin', {
        method: "POST",
        body: JSON.stringify(input),
        headers: new Headers ({
            "Content-Type": "application/json",
            })
    })
    .then(res => res.json())
    .then(res => setTokenInLocalStorage(res));

export let fetchUserObject = (token) =>
fetch(server + '/user', {
    method: "GET",
    headers: new Headers ({
        "Content-Type": "application/json",
        "authorization": localStorage.getItem('token') 
        })
    })
    .then(res => res.json())

export let postInitialWalk = (input) =>
    fetch(server + '/postwalk', {
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
    return fetch(server + '/postwalkthumbnail', {
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
    return fetch(server + '/postwalkaudio', {
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
    return fetch(server + '/postwalkvideo', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: new Headers ({
        "authorization": localStorage.getItem('token') 
            })
    }).then(res => res.text());
}

export let postPoi = (input) =>
    fetch(server + '/postpoi', {
        method: "POST",
        body: JSON.stringify(input),
        headers: new Headers ({
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token')
            })
    })
    .then(res => res.json());

export let updatePoiPositions = (pois) =>
    fetch(server + '/updatepoipositions', {
        method: "POST",
        body: JSON.stringify(pois),
        headers: new Headers ({
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token')
        })
    }).then(res => res.json());

export let deletePoi = (id) =>
    fetch(server + '/deletepoi/' + id, {
        method: "DELETE",
        mode: 'cors',
        headers: new Headers ({
            "authorization": localStorage.getItem('token')
        })
    }).then(res => res.json());

export let postPoiDescription = (input) =>
    fetch(server + '/poidescription', {
        method: "POST",
        body: JSON.stringify(input),
        headers: new Headers ({
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token')
        })
    }).then(res => res.json());

export let postPoiTitle = (input) =>
    fetch(server + '/poititle', {
        method: "POST",
        body: JSON.stringify(input),
        headers: new Headers ({
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token')
        })
    }).then(res => res.json());

export let postPoiThumbnail = (id, data) => {
    let formData = new FormData();
    formData.append('poi-thumbnail', data);
    formData.append('id', id)
    return fetch(server + '/postpoithumbnail', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: new Headers ({
        "authorization": localStorage.getItem('token') 
            })
    }).then(res => res.text());
}

export let postPoiAudio = (id, data) => {
    let formData = new FormData();
    formData.append('poi-audio', data);
    formData.append('id', id)
    return fetch(server + '/postpoiaudio', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: new Headers ({
        "authorization": localStorage.getItem('token') 
            })
    }).then(res => res.text());
}

export let postPoiNextAudio = (id, data) => {
    let formData = new FormData();
    formData.append('poi-next-audio', data);
    formData.append('id', id)
    return fetch(server + '/postpoinextaudio', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: new Headers ({
        "authorization": localStorage.getItem('token') 
            })
    }).then(res => res.text());
}

export let postPoiVideo = (id, data) => {
    let formData = new FormData();
    formData.append('poi-video', data);
    formData.append('id', id)
    return fetch(server + '/postpoivideo', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: new Headers ({
        "authorization": localStorage.getItem('token') 
            })
    }).then(res => res.text());
}

export let getWalk = (id) =>
    fetch(server + '/getwalk/' + id, {
        method: 'GET',
        headers: new Headers ({
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token')
        })
    }).then(res => res.json())

export let getWalkPois = (walkId) =>
    fetch(server + '/getwalkpois/' + walkId, {
        method: 'GET',
        headers: new Headers ({
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token')
        })
    }).then(res => res.json())

export let getContributedWalks = () =>
    fetch(server + '/getcontributedwalks', {
        method: 'GET',
        headers: new Headers ({
            "authorization": localStorage.getItem('token')
        })
    }).then(res => res.json())

export let updateWalkLength = (input) =>
    fetch(server + '/updatewalklength', {
        method: 'POST',
        body: JSON.stringify(input),
        headers: new Headers ({
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token')
        })
    }).then(res => res.text())

export let deleteWalk = (walkId) =>
    fetch(server + '/deletewalk/' + walkId, {
        method: "DELETE",
        mode: 'cors',
        headers: new Headers ({
            "authorization": localStorage.getItem('token')
        })
    }).then(res => res.json());

export let updatePublicStatus = (walkId) => 
    fetch(server + '/updatepublicstatus/' + walkId, {
        method: 'PUT',
        headers: new Headers ({
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token')
        })
    }).then(res => res.json())

export let getGuideOrTitle = (search) =>
    fetch(server + '/getguideortitle/' + search, {
        method: 'GET',
        mode: 'cors',
        headers: new Headers ({
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token')
        })
    }).then(res => res.json())

export let getResultClick = (result) =>
    fetch(server + '/getresultclick/' + result, {
        method: 'GET',
        mode: 'cors',
        headers: new Headers ({
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token')
        })
    }).then(res => res.json())

export let getResultsWithinDistance = ({ lat, long, miles, limit, sortby }) =>
    fetch(`${server}/getresultswithindistance/${lat}/${long}/${miles}/${limit}/${sortby}`, {
        method: 'GET',
        mode: 'cors',
        headers: new Headers ({
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token')
        })
    }).then(res => res.json())

export let getProfile = (username) =>
    fetch(`${server}/getprofile/${username}`, {
        method: 'GET',
        mode: 'cors',
        headers: new Headers ({
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token')
        })
    }).then(res => res.json())