const form = document.querySelector(".form");
const input = document.querySelector(".input");
const buttonCreate = document.querySelector(".button-create");
const tasks = document.querySelector(".tasks");
const checkboxAllButton = document.createElement("input");
const backetButton = document.createElement("button");
const backetList = document.createElement("ul");
const newTasks = [];
const deletedTasks = [];

checkboxAllButton.type = "checkbox";
backetButton.innerHTML = "Backet";


tasks.before(checkboxAllButton);
form.after(backetButton);
backetButton.after(backetList)

const handleCheckboxAll = (event) => {
   const checkboxes = document.getElementsByClassName("checkbox");
   
   if (event.target.checked) {
      for (const checkbox of checkboxes) {
         checkbox.checked = true;
      }
   } else {
      for (const checkbox of checkboxes) {
         checkbox.checked = false;
      }
   }
}

const handleSumbit = (event) => {
   event.preventDefault();
   const formData = new FormData(form);
   const inputValue = formData.get("input");
   tasks.innerHTML = "";
   newTasks.push(inputValue);

   newTasks.forEach((task) => {
      const taskBlock = document.createElement("div")

      const taskText = document.createElement("span");
      const taskCheckbox = document.createElement("input");
      const taskDeleteButton = document.createElement("button");
   
      taskDeleteButton.style.display = "none";
      taskDeleteButton.innerHTML = "Delete task";
   
      taskText.innerHTML = task;
      taskCheckbox.type = "checkbox";
   
      taskCheckbox.classList.add("checkbox")
   
      taskCheckbox.addEventListener("click", handleCheckboxClick)
   
   
      taskBlock.append(
         taskText,
         taskCheckbox,
         taskDeleteButton
      )
   
      tasks.append(taskBlock);
   })
}

const handleCheckboxClick = (event) => {

   if (event.target.checked) {
      const text = event.target.previousSibling;
      text.style.textDecoration = "line-through";

      const taskDeleteButton = event.target.nextSibling;
      taskDeleteButton.style.display = "block"
      console.log(taskDeleteButton);
      

      taskDeleteButton.addEventListener("click", (event) => {
         const input = event.target.previousSibling.previousSibling;
         deletedTasks.push(input.innerHTML);
         
         event.target.parentElement.remove();
      })

   } else {
      const text = event.target.previousSibling;
      text.style.textDecoration = "none";

      const taskDeleteButton = event.target.nextSibling;
      taskDeleteButton.style.display = "none"

   }
}

const handleBacketClick = () => {
   deletedTasks.forEach((task) => {
      const deletedTask = document.createElement("div");
      const text = document.createElement("span");
      const button = document.createElement("button");
      text.innerHTML = task;
      button.innerHTML = "Restore task";

      deletedTask.append(
         text,
         button,
      );

      backetList.append(deletedTask)

      button.addEventListener("click", (event) => {
         console.log(event);
         const text = event.target.previousSibling.innerHTML;
         event.target.parentElement.remove();
         tasks.innerHTML = "";
         newTasks.push(text);

         newTasks.forEach((task) => {
            const taskBlock = document.createElement("div")
      
            const taskText = document.createElement("span");
            const taskCheckbox = document.createElement("input");
            const taskDeleteButton = document.createElement("button");
         
            taskDeleteButton.style.display = "none";
            taskDeleteButton.innerHTML = "Delete task";
         
            taskText.innerHTML = task;
            taskCheckbox.type = "checkbox";
         
            taskCheckbox.classList.add("checkbox")
         
            taskCheckbox.addEventListener("click", handleCheckboxClick)
         
         
            taskBlock.append(
               taskText,
               taskCheckbox,
               taskDeleteButton
            )
         
            tasks.append(taskBlock);
         })
         

         console.log("res", event);
      })
   });
   // console.log(deletedTasks);
}

form.addEventListener("submit", handleSumbit);
checkboxAllButton.addEventListener("click", handleCheckboxAll);
backetButton.addEventListener("click", handleBacketClick);