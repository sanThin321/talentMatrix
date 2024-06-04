document.addEventListener("DOMContentLoaded", () => {
    const talentId = "60d..."; // example talent ID, replace with actual ID
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get("email");
  
    fetch(`/client/get_client_email/${email}`)
      .then((response) => response.json())
      .then((data) => {
        data = data[0];
  
        const imgWrapper = document.querySelector(".profile-img");
        const img = document.createElement("img");
        let base64String = arrayBufferToBase64(data.profile_img.data);
        img.src = `data:image/jpeg;base64,${base64String}`;
        imgWrapper.appendChild(img);
  
        document.getElementById("username").textContent = data.username;
        document.getElementById("fullname").textContent = data.fullname;
        document.getElementById("email").textContent = data.email;
        document.querySelector(
          ".address h5"
        ).innerHTML = `<span>${data.dzongkhag}</span>, <span>${data.region}</span>`;
        document.getElementById("experience").textContent = data.experiences;
        document.getElementById("about").textContent = data.bio;
  
        const skillsContainer = document.querySelector(".skills");
        const expertise = data.expertise.split(",");
        expertise.forEach((skill) => {
          const li = document.createElement("li");
          li.className = "skill";
          li.textContent = skill;
          skillsContainer.appendChild(li);
        });
  
        document.getElementById("school").textContent = data.school;
        document.getElementById("field_of_study").textContent =
          data.field_of_study;
        document.getElementById("date_from").textContent =
          data.education_date_from.split("T")[0];
        document.getElementById("date_to").textContent =
          data.education_date_to.split("T")[0];
  
        document.getElementById("title").textContent = data.ex_position;
        document.getElementById("company").textContent = data.company;
        document.getElementById("from").textContent =
          data.employment_from.split("T")[0];
        document.getElementById("to").textContent =
          data.employment_to.split("T")[0];
  
        document.querySelector(".Facebook").parentNode.href = data.facebook;
        document.querySelector(".twitter").parentNode.href = data.twitter;
        document.querySelector(".linkdin").parentNode.href = data.linkedin;
      })
      .catch((error) => console.error("Error fetching talent:", error));
  });
  
  // Function to convert byte array to Base64 string
  function arrayBufferToBase64(buffer) {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  