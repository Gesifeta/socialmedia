
function createPost() {
    const postContainer = document.getElementById("app-post-container");
    const postInputValue = document.getElementById("post").value;
    const appPostList=document.createElement("div")
    appPostList.classList.add("app__post-list")
    const appPostContent=document.createElement("div")
    appPostContent.classList.add("app__post-content")
    const appPostListTaskContainer=document.createElement("div");
    appPostListTaskContainer.classList.add("task")
    const editPost=document.createElement("div")
    editPost.classList.add("edit-post")
    editPost.textContent="Edit"
    const deletePost=document.createElement("div")
    deletePost.classList.add("delete-post")
    deletePost.textContent="Delete"

    postContainer.appendChild(appPostList)
    appPostList.appendChild(appPostContent)
    appPostList.appendChild(appPostListTaskContainer)
    
    appPostContent.textContent=postInputValue
    appPostListTaskContainer.appendChild(editPost)
    appPostListTaskContainer.appendChild(deletePost)

}