let inpt=document.querySelector("input");
let search=document.querySelector("button");
let moon=document.querySelector(".fa-moon")
let sun=document.querySelector(".fa-sun")
sun.style.display="none"
search.addEventListener("click",(e)=>{
    e.preventDefault();
    let username=inpt.value;
    document.querySelector(".loader").style.display="block";
    setTimeout(()=>{
        getUser(username);
        document.querySelector(".loader").style.display="none";
    },1500)
})

async function getUser(username){
    try{
        let data=await fetch(`https://api.github.com/users/${username}`)
        let fetchedData=await data.json();
        console.log(fetchedData.avatar_url);
        let div1=document.createElement("div");
        div1.innerHTML=
        `<div class="profile">
                    <div class="img_txt">
                        <img src=${fetchedData.avatar_url} alt="">
                        <span class="text">
                            <h2>${fetchedData.name}</h2>
                            <p>@${fetchedData.login}</p>
                        </span>
                    </div>
                    <span>Joined ${fetchedData.created_at.slice(0,10).split("-").reverse().join("/")}</span>
                </div>
                <div class="description">${fetchedData.bio==null?"---":fetchedData.bio}</div>
                <div class="repo">
                    <span>Repos <br>${fetchedData.public_repos==null?"---":fetchedData.public_repos}</span>
                    <span>Followers <br>${fetchedData.followers==null?"---":fetchedData.followers}</span>
                    <span>Following <br>${fetchedData.following==null?"---":fetchedData.following}</span>
                </div>
                <div class="links">
                    <div class="left-links">
                        <p><i class="fa-solid fa-map-location"></i> ${fetchedData.location==null?"---":fetchedData.location}</p>
                        <p><i class="fa-solid fa-link"></i> ${fetchedData.blog==null?"---":fetchedData.blog}</p>
                    </div>
                    <div class="right-links">
                        <p><i class="fa-brands fa-twitter"></i> ${fetchedData.twitter_username==null?"---":fetchedData.twitter_username}</p>
                        <p><i class="fa-solid fa-building"></i> ${fetchedData.company==null?"---":fetchedData.company}</p>
                    </div>
                </div>
        `
        document.querySelector(".details").replaceChildren(div1);
    }catch(err){
        if(inpt.value==""){
            document.querySelector(".details p").innerText="Please Enter User Name"
        }else{
            document.querySelector(".details p").innerText="User Does Not Exist"
        }
       
    }
   
}
let r=document.querySelector(":root")
moon.addEventListener("click",()=>{
    moon.style.display="none"
    sun.style.display="block"
    r.style.setProperty("--bgcolor", "white");
    r.style.setProperty("--txtclr", "black");
})

sun.addEventListener("click",()=>{
    moon.style.display="block"
    sun.style.display="none"
    r.style.setProperty("--bgcolor", "black");
    r.style.setProperty("--txtclr", "white");
})