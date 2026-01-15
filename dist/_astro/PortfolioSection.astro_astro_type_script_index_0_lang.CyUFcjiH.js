(function(){console.log("PortfolioSection: Initializing...");const l=[{id:1,image:"/images/portfolio/basketball-team-1.jpg",video:"/videos/1.mp4",title:"Sablon Reflektif",category:"jersey",size:"small",type:"video",description:"Ketika jersey kelasmu paling menyala dari kelas sebelah😎",link:"https://www.instagram.com/reel/DTU3eXnEdUd/"},{id:2,image:"/images/portfolio/futsal-design-1.jpg",video:"/videos/2.mp4",title:"Support Jalan-jalan",category:"jersey",size:"small",type:"video",description:"Disini kita bakal support jalan-jalan kelasmu pake cashback + free ongkir🤩🫶🏻",link:"https://www.instagram.com/reel/DTKkPeRkRIy/"},{id:3,image:"/images/portfolio/football-team-1.jpg",video:"/videos/3.mp4",title:"Proses Jersey",category:"jersey",size:"small",type:"video",description:"Proses dibalik jersey keren kalian kalo customnya di Uno Jersey🤩✨",link:"https://www.instagram.com/reel/DTARC9VEUQg/"},{id:4,image:"/images/portfolio/volleyball-team-1.jpg",video:"/videos/4.mp4",title:"Unboxing Jersey Boxy",category:"jersey",size:"small",type:"video",description:"Warna + desainnya cakep banget apalagi pake cuttingan boxy😎",link:"https://www.instagram.com/reel/DTIALyVEeDC/"}],i=document.getElementById("portfolio-grid");if(!i){console.error("PortfolioSection: portfolio-grid element not found");return}console.log("PortfolioSection: Found portfolio-grid, computed style display:",window.getComputedStyle(i).display),console.log("PortfolioSection: Found portfolio-grid, rendering",l.length,"items"),i.innerHTML="",(window.innerWidth<=768?l.slice(0,2):l).forEach((o,t)=>{const e=document.createElement("div");e.className=`portfolio-card portfolio-${o.size}`,e.dataset.category=o.category,e.dataset.index=t,e.style.opacity="0",o.type==="video"&&o.video?e.innerHTML=`
          <div class="portfolio-card-inner">
            <video
              src="${o.video}"
              alt="${o.title}"
              class="portfolio-video"
              muted
              loop
              autoplay
              playsinline
              loading="lazy"></video>
            <div class="portfolio-overlay">
              <div class="portfolio-content">
                <span class="portfolio-category">#${o.category.toUpperCase()}</span>
                <h3 class="portfolio-title">${o.title}</h3>
                <p class="portfolio-description">${o.description}</p>
              </div>
            </div>
          </div>
        `:e.innerHTML=`
          <div class="portfolio-card-inner">
            <img src="${o.image}" alt="${o.title}" loading="lazy" class="portfolio-image">
            <div class="portfolio-overlay">
              <div class="portfolio-content">
                <span class="portfolio-category">#${o.category.toUpperCase()}</span>
                <h3 class="portfolio-title">${o.title}</h3>
                <p class="portfolio-description">${o.description}</p>
              </div>
            </div>
          </div>
        `,i.appendChild(e),e.addEventListener("click",()=>{o.link&&window.open(o.link,"_blank")})}),console.log("PortfolioSection: Successfully rendered",l.length,"portfolio cards"),console.log("PortfolioSection: portfolio-grid children count:",i.children.length),setTimeout(()=>{const o=i.querySelectorAll(".portfolio-card");console.log("PortfolioSection: Found",o.length,"portfolio-card elements"),o.forEach((t,e)=>{setTimeout(()=>{t.style.transition="opacity 0.6s ease, transform 0.6s ease",t.style.opacity="1",t.style.transform="translateY(0)"},e*100)}),console.log("PortfolioSection: Animation started for",o.length,"cards")},100)})();
