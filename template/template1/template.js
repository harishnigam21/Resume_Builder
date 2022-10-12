function addNewSDField() {
    //  console.log("Adding new Field");
  let newNode = document.createElement("select");
  newNode.classList.add("form-control");
  newNode.classList.add("sdField");
  newNode.classList.add("mt-2");
  newNode.setAttribute("rows", 3);
  newNode.setAttribute("Value", "select");
  let sdOb = document.getElementById("sd");
  let sdAddButtonOb=document.getElementById("sdAddButton");
  
  sdOb.insertBefore(newNode, sdAddButtonOb);
  }
  
  function addNewAQField()
  {
      let newNode=document.createElement("textarea");
      newNode.classList.add("form-control");
      newNode.classList.add("aqField");
      newNode.classList.add("mt-2");
      newNode.setAttribute("rows", 3);
      newNode.setAttribute("placeholder", "Enter here");
      
      let aqOb = document.getElementById("aq");
      let aqAddButtonOb=document.getElementById("aqAddButton");
      
      aqOb.insertBefore(newNode, aqAddButtonOb);
  }
  
  function generateResume()
  {
      let nameField=document.getElementById("nameField").value;
      let nameT1=document.getElementById("nameT1");
      nameT1.innerHTML = nameField;
  
      document.getElementById("nameT2").innerHTML=nameField;
      document.getElementById("contactT").innerHTML=document.getElementById("contactField").value;
      document.getElementById("addressT").innerHTML=document.getElementById("addressField").value;
      document.getElementById("fbT").innerHTML=document.getElementById("fbField").value;
      document.getElementById("instaT").innerHTML=document.getElementById("instaField").value;
      document.getElementById("linkedT").innerHTML=document.getElementById("linkedField").value;
      document.getElementById("objectiveT").innerHTML=document.getElementById("objectiveField").value;
  
      let sds = document.getElementsByClassName("sdField");
      let str = "";
      for (let e of sds)
      {
          str = str + `<li> ${e.value} </li>`;
      }
      document.getElementById("sdT").innerHTML = str;
  
      let aqs = document.getElementsByClassName("aqField");
      let str1 = "";
      for (let e of aqs)
      {
          str1 += `<li> ${e.value} </li>`;
      }
      document.getElementById("aqT").innerHTML = str1;
  
      let file=document.getElementById("imgField").files[0]
      console.log(file);
      let reader=new FileReader()
      reader.readAsDataURL(file);
      console.log(reader.result);
  
      reader.onloadend=function () {
          document.getElementById("imgTemplate").src = reader.result;
      }
  
      document.getElementById("resume-form").style.display="none";
      document.getElementById("resume-template").style.display="block";
  }
  function printResume() {
      window.print();
      }
      
  
  
  