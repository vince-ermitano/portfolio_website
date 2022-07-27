export function openDialog() {
    document.querySelector('dialog').showModal();
}

var dialogMode;

let currentBlogTarget;

let tempStorage = JSON.parse(localStorage.getItem('posts'));

function updateDisplay() {

    let remove = document.querySelectorAll('.blog-post');
    remove.forEach(post => {
        post.remove();
    });

    tempStorage = JSON.parse(localStorage.getItem('posts')) || [];

    const blogSection = document.getElementById('blog-area');
    
    tempStorage.forEach((post) => {
        let mainSection = document.querySelector('main');
        const div = document.createElement('div');
        div.className = "blog-post";
        div.dataset.blogId = post.id;
        const header = document.createElement('h3');
        const headerText = document.createTextNode(`${post.title}`);
        const dateNode = document.createElement('h4');
        const dateText = document.createTextNode(`${post.date}`);
        const summaryNode = document.createElement('p');
        const summaryText = document.createTextNode(`${post.summary}`);
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        editBtn.className = 'edit-button';
        editBtn.textContent = "EDIT";
        deleteBtn.className = "delete-button";
        deleteBtn.textContent = "DELETE";

        header.appendChild(headerText);
        dateNode.appendChild(dateText);
        summaryNode.appendChild(summaryText);
        div.appendChild(header);
        div.appendChild(dateNode);
        div.appendChild(summaryNode);
        div.appendChild(editBtn);
        div.appendChild(deleteBtn);
        mainSection.appendChild(div);
    });
    addListenersForEditButtons();
    addListenersForDelButtons();
}

function addListenersForDelButtons() {
    let deleteBtns = document.querySelectorAll('.delete-button');

    deleteBtns.forEach(button => {
        if (button.getAttribute('listener-active') !== 'true') {
            button.setAttribute('listener-active', 'true');
            button.addEventListener('click', e => {
    
                let confirmedDelete = confirm('Are you sure you want to delete post?');
                console.log(confirmedDelete);
    
                if (confirmedDelete) {
                    deleteBlogPost(e.target);
                }
            });
        }
    });
}

function addListenersForEditButtons() {
    let editBtns = document.querySelectorAll('.edit-button');

    editBtns.forEach(button => {
        if (button.getAttribute('listener-active') !== 'true') {
            button.setAttribute('listener-active', 'true');
            button.addEventListener('click', e => {
                let blogToEdit = e.target.parentElement;
                let blogId = blogToEdit.dataset.blogId;
                currentBlogTarget = blogId;
                dialogMode = 'EDIT';
                openDialog();
    
                //prefill inputs with existing values  
                document.getElementById('titleFld').value = blogToEdit.firstChild.textContent;
                document.getElementById('dateFld').value = blogToEdit.querySelector('h4').textContent;
                document.getElementById('summaryFld').value = blogToEdit.querySelector('p').textContent;
            });
        }
    });
}

function insertBlogPost(sTitle, sDate, sSummary) {
    let newPost = {
        id: crypto.randomUUID(),
        title: sTitle,
        date: sDate,
        summary: sSummary
    };

    tempStorage.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(tempStorage));

    updateDisplay();
}

function deleteBlogPost(delBtn) {
    let blogToDel = delBtn.parentElement;
    let blogId = blogToDel.dataset.blogId;
    console.log('clicked delete');

    tempStorage = JSON.parse(localStorage.getItem('posts'));

    for (let i = 0; i < tempStorage.length; i++) {
        if (tempStorage[i].id === blogId) {
            console.log('found');
            tempStorage.splice(i, 1);
            break;
        }
    }

    localStorage.setItem("posts", JSON.stringify(tempStorage));
    blogToDel.remove();
    updateDisplay();
    addListenersForEditButtons();
}

function editBlogPost(sTitle, sDate, sSummary) {
    tempStorage = JSON.parse(localStorage.getItem('posts'));

    for (let i = 0; i < tempStorage.length; i++) {
        if (tempStorage[i].id === currentBlogTarget) {
            tempStorage[i].title = sTitle;
            tempStorage[i].date = sDate;
            tempStorage[i].summary = sSummary;
        }
    }

    localStorage.setItem("posts", JSON.stringify(tempStorage));
    updateDisplay();
    addListenersForEditButtons();
}

document.addEventListener('DOMContentLoaded', () => {
    console.log(tempStorage);
    updateDisplay();

    //grab html elements
    let customDialog = document.querySelector('dialog');
    let openDialogButton = document.getElementById('open-dialog-button');
    let cancelButton = document.getElementById('cancel-button');
    let addButton = document.getElementById('add-button');
    let sendButton = document.getElementById('send-button');
    let form = document.getElementById('myForm');

    //setup event listeners
    customDialog.addEventListener('cancel', e => {
        e.preventDefault();
    });

    addListenersForDelButtons();
    addListenersForEditButtons();

    addButton.addEventListener('click', e => {
        console.log('clicked add');
        dialogMode = 'INSERT';
        openDialog();
    })

    cancelButton.addEventListener('click', (e) => {
        customDialog.close('CANCELLED');
        console.log(document.querySelector('dialog').returnValue);
    });
    
    form.addEventListener('submit', (e) => {        
        e.preventDefault();

        let blogTitle = document.getElementById('titleFld').value;
        let blogDate = document.getElementById('dateFld').value;
        let blogSummary = document.getElementById('summaryFld').value;
        if (dialogMode === 'INSERT') {
            insertBlogPost(blogTitle, blogDate, blogSummary);
            alert('Successfully added your post!');
        }
        else if (dialogMode === 'EDIT') {
            editBlogPost(blogTitle, blogDate, blogSummary);
            alert('Successfully edited your post!');
        }

        form.reset();
        customDialog.close('SENT');
    });
});