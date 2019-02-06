let Build = {
    PageHeight : (window.innerHeight - 50),
    init: (ev)=>{
        Build.Nav.init(ev);
        Build.ContactInfo();
        Build.Work();
        Build.Education();
        Build.Projects();
    },
    Nav: {
        init: (ev)=>{
          let c = Build.Nav;
            c.NavSizing(ev)
            c.links()
        },
        NavSizing: (ev)=>{
        let rootElement = document.querySelector(".Navigation");
        let divide = rootElement.children.length
            rootElement.querySelectorAll(".NavList").forEach((element)=>{
            element.style.height = `${(Build.PageHeight)/divide}px`;
            element.style["padding-top"] = `${(Build.PageHeight)/(divide *2) - 10}px`;
            element.style["font-size"] = "20px";
        })
        },
        links: ()=>{ document.querySelector("#Navigation").addEventListener("click", Build.Nav.back);
        document.querySelector('#Mail').addEventListener("click", Build.Mail);
        document.querySelectorAll(".NavList").forEach((link)=>{
            link.addEventListener("click", Build.Nav.to)
        })
        },
        to: (ev)=>{
            ev.target.classList.add("clicked");
            document.querySelectorAll(".page").forEach((page)=>{page.classList.add("hidden")})
           document.querySelector("#BannerTitle").textContent = ev.target.id; document.querySelector(`.${ev.target.id}`).classList.remove("hidden");
            
            /////////// History stuff
            history.pushState({}, "Home", window.location)
            console.log(window.location);
        },
        minimize: (ev)=>{
            let target = ev.target;
            if(target.classList.contains("Minimizer")){
                target = target.parentElement;}
            if(!target.classList.contains("min")){
            target.classList.add("min");
            target.querySelector(".Minimizer").textContent = "+";
            } else {
            target.classList.remove("min");
            target.querySelector(".Minimizer").textContent = "-";
            }
        },
        back: (ev)=>{
            history.back()
        }
    },
    ContactInfo: ()=>{
        let stage = document.querySelector(".Contact");
        
        stage.childNodes.forEach((child)=>{
            if(child.classList){
                let innerData = resumeContents[child.classList.value]
                if(Array.isArray(innerData)){
                    let additions;
                    innerData.forEach((item)=>{
                        child.innerHTML += `<ul> ${item} </ul>`
                    })
                }
                else {
                    child.textContent += innerData;
                }
                
            }
        })
    },
    Work: ()=>{
        let stage = document.querySelector(".Work");
        let categories = Object.keys(
        resumeContents.Work)
        let additions;
        categories.forEach((JobType)=>{
            additions = document.createElement("h4");
            additions.textContent = JobType;
            let newStuff = document.createElement("div")
            newStuff.innerHTML = 
            ` <p><strong> Location: </strong> ${resumeContents.Work[JobType].Location} </p>
            <p> <strong>Work Duration:</strong> ${resumeContents.Work[JobType].time} </p>
            <p> <strong>Description: </strong> <br /> ${resumeContents.Work[JobType].description} </p> 
<p> <strong>Supervisor:</strong> ${resumeContents.Work[JobType].refference.name} <p>
<p> <strong>Phone #:</strong> ${resumeContents.Work[JobType].refference.number} <p>`;
            stage.appendChild(additions);
            stage.appendChild(newStuff)
        })
    },
    Education: ()=>{
        let stage = document.querySelector(".Education");
        Object.keys(resumeContents.Education).forEach((school)=>{
            stage.innerHTML += `<p><strong>${resumeContents.Education[school].Location}:  <br /></strong>${resumeContents.Education[school].Program} <br />
             Graduated:${resumeContents.Education[school].Graduated} </p> <br />`
        })
        stage.innerHTML += `<p><strong > Current Courses </strong> </p>`;
        let sections = Object.keys(resumeContents.Marks)
        let additions = document.createElement("table");
        stage.appendChild(additions)
        sections.forEach((semester)=>{
            additions.innerHTML += `<tr><td></td><td><h4 style="Width: 100%; text-align: center;"> ${semester} </h4></td><td></td></tr>`
            resumeContents.Marks[semester].forEach((course)=>{
            let NewElementCourse = document.createElement("tr");
                NewElementCourse.innerHTML = `
<td>${course.Code}</td>
<td>${course.Name}</td>
<td>${course["Letter Grade"]}</td>`;
                additions.appendChild(NewElementCourse);
            })
        })
    },
    Projects: ()=>{
        document.querySelectorAll(".Project").forEach((zone)=>{zone.addEventListener("click", Build.Nav.minimize)})
        Object.keys(resumeContents.Projects).forEach((projectType)=>{
            
        })
      
        let zone = document.querySelector(".School");
        Build.ProjectFiller(zone, resumeContents.Projects.School)
        zone = document.querySelector(".Extracurricular");
        Build.ProjectFiller(zone, resumeContents.Projects["Extracurricular_Learning"])
        zone = document.querySelector(".Hoby");
        Build.ProjectFiller(zone, resumeContents.Projects.Hoby)
        
},
    ProjectFiller: (zone, Data)=>{
        let contentArea = zone.nextElementSibling;
        let additions;
        Data.forEach((Project)=>{
            additions = document.createElement('div');
            additions.classList.add("Card");
            additions.innerHTML = `
<h4 style="text-align: center;"> ${Project.Name} </h4>
<p> Code: <br /> <a href="${Project.URL}">${Project.URL} </a> </p>
<p> Working Site: <br /> <a href="${Project.Pages}">${Project.Pages} </a> </p>`
            if(Array.isArray(Project.Description)){
            Project.Description.forEach((point)=>{additions.innerHTML += `<li> ${point} </li>`});} else {
                additions.innerHTML += `<li> ${Project.Description} </li>`
            }
            contentArea.appendChild(additions);
        })
    },
    Mail: (ev)=>{
        console.log('ping')
        window.location.href = "mailto:tylercrozman@gmail.com?subject=Resume&body=";
    }
}

window.onpopstate = (ev)=>{
    console.log(ev);
document.querySelectorAll(".page").forEach((page)=>{page.classList.add("hidden")})
           document.querySelector("#BannerTitle").textContent = "Navigation"; document.querySelector(`.Navigation`).classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", Build.init)
