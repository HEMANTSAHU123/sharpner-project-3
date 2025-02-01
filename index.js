async function handlesearch(event) {
    event.preventDefault();
    const search = document.getElementById("search").value.toLowerCase();
    const liitems = document.querySelectorAll("ul li");
    if(!search){
      liitems.forEach((li) => {
        li.style.display='block'
      });
      return
    }
   liitems.forEach((li) => {
      let text=li.innerText.trim().toLowerCase();
      li.style.display=text.includes(search)?'block':'none'
    });
    
  }
  let editId = null;
  
  const api =
    "https://crudcrud.com/api/"+"3db4f53b7db0444ba9481d0da1c08f18" + "/password/";
  async function handleFormSubmit(event) {
    event.preventDefault();
    const title = event.target.title.value;
    const password = event.target.password.value;
    const userdetails = {
      title: title,
      password: password,
    };
    if (editId !== null) {
      let response = await axios.put(api + editId, {
        userdetails,
      });
      alert("updated succesfully");
      li = document.getElementById(editId);
      li.innerText = title + " " + password;
      const button = document.getElementById("button");
      button.textContent = "add item";
  
      event.target.reset();
      editId = null;
      return;
    }
    let response = await axios.post(api, {
      userdetails,
    });
    console.log(userdetails);
    console.log(response.data);
    event.target.reset();
    display(response.data.userdetails, response.data._id);
  }
  function display(userdetails, id) {
    //  console.log(userdetails.quantity)
    const deletebtn = document.createElement("button");
    const text1 = document.createTextNode("delete");
    deletebtn.appendChild(text1);
    const editbtn = document.createElement("button");
    const text2 = document.createTextNode("edit");
    editbtn.appendChild(text2);
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    li.id = id;
    li.textContent = userdetails.title + " " + userdetails.password;
    li.appendChild(deletebtn);
    li.appendChild(editbtn);
  
    // const quantity=document.getElementById('quantity');
  
    editbtn.addEventListener("click", function () {
      // console.log(id);
      const title = document.getElementById("title");
      const password = document.getElementById("password");
      title.value = userdetails.title;
      password.value = userdetails.password;
      editId = id;
      const button = document.getElementById("button");
      button.textContent = "Update item";
    });
    deletebtn.addEventListener("click", async function () {
      await axios.delete(api + id);
      li.remove();
      // alert("item is deleted");
    });
    ul.appendChild(li);
  }
  
  async function updateServer(userdetails, title, password, id) {
    const updatedDetails = {
      ...userdetails,
      title: title,
      password: password,
    };
    // await fetch(api+id,{ method:'PUT', body:JSON.stringify(updatedDetails)})
    await axios.put(api + id, { updatedDetails });
    li.textContent = updatedDetails.title + updatedDetails.password;
  }
  
  document.addEventListener("DOMContentLoaded", async () => {
    let response = await axios.get(api);
    console.log(response.data);
    for (let item of response.data) {
      display(item.userdetails, item._id);
    }
  });
  