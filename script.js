 const url = 'https://api.github.com/user';
 const searchBtn = document.getElementById('searchBtn');
 const picture = document.querySelector('.avatar');
 const userName = document.querySelector('#userName');
 const dateOfRegistration = document.querySelector('#dateOfRegistration');
 const bio = document.querySelector('#bio');
 const repos = document.querySelector('.repos');
 const followers = document.querySelector('.followers');
 const following = document.querySelector('.following');


 const localisation = document.querySelector('.localisation');
 const twitter = document.querySelector('.twitter');
 const blog = document.querySelector('.blog');
 const email = document.querySelector('.email');
 const errorElement = document.querySelector('.errorElement')





 function searchUser() {
   const searchNickname = document.querySelector('input').value;


   const promise = fetch(`https://api.github.com/users/${searchNickname}`)

     .then((response) => {


       console.log(response);

       /* if (response.status === 404) {

         console.log('Nie znaleziono użytkownika o podanym loginie')
         let newItem = document.createElement("span");
         let textnode = document.createTextNode("User not found");
         newItem.appendChild(textnode);
         newItem.classList.add('userNotFound')

         var searchBar = document.querySelector(".searchBar");
         searchBar.insertBefore(newItem, searchBar.childNodes[2]);



         throw new Error('User Not found');

       }*/

       if (response.status === 404) {




         //         document.querySelector('.cont').style.display = "none";
         //         errorElement.style.display = 'block';
         throw new Error('User Not found');

       }

       return response.json()

     })
     .then((data) => {
       errorElement.remove()
       console.log(data)



       let imgSrc = data.avatar_url
       const img = document.querySelector('.avatar');

       img.src = imgSrc;
       //          picture.append(img)
       img.innerHTML = img.src;





       let login = data.login
       userName.innerHTML = login



       let createdAt = data.created_at;
       let whenJoined = new Date(createdAt)





       var month = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ][whenJoined.getMonth()];
       var monthAndYear = month + ' ' + whenJoined.getFullYear();
       var monthAndYearAndDay = whenJoined.getDay() + ' ' + monthAndYear;


       dateOfRegistration.innerHTML = 'Joined: ' + monthAndYearAndDay;






       let biography = data.bio
       bio.innerHTML = biography;


       let repository = data.public_repos;
       repos.innerHTML = 'Repos: ' + repository;


       let howManyFollowers = data.followers;
       followers.innerHTML = 'Followers: ' + howManyFollowers;


       let howManyFollowing = data.following;
       following.innerHTML = 'Following: ' + howManyFollowing;

       let city = data.location;
       if (city == null) {
         localisation.innerHTML = 'No information';
       } else {
         localisation.innerHTML = city;
       }



       let twitterId = data.twitter_username;


       if (twitterId == null) {
         twitter.innerHTML = 'No information';
       } else {
         twitter.innerHTML = twitterId;
       }


       let blogURL = data.blog;


       if (blogURL == null || blogURL == '') {
         blog.innerHTML = 'No information';
       } else {
         blog.innerHTML = blogURL;
       }


       let emailAddress = data.email;


       if (emailAddress == null) {
         email.innerHTML = 'No information';
       } else {
         email.innerHTML = emailAddress;
       }
       document.querySelector('.cont').style.display = "flex";

     })
     .catch(function (error) {
       console.log(error);
       //       errorElement.style.display = 'block';

       document.querySelector('.cont').style.display = "none";
       errorElement.innerHTML = error;

       //       newItem.remove();


     });


 };


 /*function showContent() {
   document.querySelector('.cont').style.display = "flex";
 };*/


 searchBtn.addEventListener('click', searchUser);
 //    searchBtn.addEventListener('click', searchUser);
