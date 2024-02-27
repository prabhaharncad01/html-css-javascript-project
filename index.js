let subMenu = document.getElementById("subMenu");

function toggleMenu()
{
    subMenu.classList.toggle("open-menu");
}




    // var dummyname = document.getElementById("user");
    // var login = document.getElementById("log");

    // if (login.textContent === 'logout') {
    //     // If user is logged in, clear username and change button text to "login"
    //     dummyname.textContent = "user_name";
    //     login.textContent = 'login';
    //     // Clear username from localStorage
    //     localStorage.removeItem("username");
    // } else {
    //     // If user is logged out, retrieve username from localStorage
    //     var storedname = localStorage.getItem("username");
     
    // }




//swiper section

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 3000, // Delay between transitions in milliseconds
    disableOnInteraction: false // Stop autoplay on interaction
  },
  slidesPerView: 1, // Number of slides per view

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  }
});



//select all filter buttons and filterable cards

const filterbutton = document.querySelectorAll(".filter-button button");
const filterablecards = document.querySelectorAll(".filterable-cards .card");

//defining the filter cards function

const filtercards = e =>{
document.querySelector(".active").classList.remove("active");
e.target.classList.add("active");
  
//iterate over each filterable cards

filterablecards.forEach(card => {

    //add hide class to hide the cards intially
    card.classList.add("hide");

    //Check if the card is selected or all is selected

    if(card.dataset.name === e.target.dataset.name || e.target.dataset.name === "all")
    {
        card.classList.remove("hide");
    }
});


};




//add click event listener to each filter button

filterbutton.forEach(button =>  button.addEventListener("click",filtercards));
    