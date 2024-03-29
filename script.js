const folderStructure = {
  name: "Root",
  type: "folder",
  children: [
    {
      name: "Folder 1",
      type: "folder",
      children: [
        { name: "File 1.txt", type: "file" },
        { name: "File 2.txt", type: "file" },
      ],
    },
    {
      name: "Folder 2",
      type: "folder",
      children: [{ name: "File 3.txt", type: "file" }],
    },
  ],
};

function createTreeElement(item) {
  const element = document.createElement("div");
  element.textContent = item.name;
  element.classList.add(item.type);

  // Create buttons container
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("btn-container");

  // Create buttons
  if (item.type === "folder") {
    const createFileBtn = document.createElement("button");
    createFileBtn.textContent = "Create File";
    createFileBtn.classList.add("btn", "btn-primary", "btn-sm", "me-1");
    createFileBtn.onclick = (event) => {
      event.preventDefault(); // Prevent the default button behavior
      createFile(item);
    };
    buttonsContainer.appendChild(createFileBtn);

    const createFolderBtn = document.createElement("button");
    createFolderBtn.textContent = "Create Folder";
    createFolderBtn.classList.add("btn", "btn-success", "btn-sm", "me-1");
    createFolderBtn.onclick = (event) => {
      event.preventDefault(); // Prevent the default button behavior
      createFolder(item);
    };
    buttonsContainer.appendChild(createFolderBtn);

    const renameBtn = document.createElement("button");
    renameBtn.textContent = "Rename";
    renameBtn.classList.add("btn", "btn-warning", "btn-sm", "me-1");
    renameBtn.onclick = (event) => {
      event.preventDefault(); // Prevent the default button behavior
      renameItem(item);
    };
    buttonsContainer.appendChild(renameBtn);
  }

  if (item.type === "file") {
    const renameBtn = document.createElement("button");
    renameBtn.textContent = "Rename";
    renameBtn.classList.add("btn", "btn-warning", "btn-sm", "me-1");
    renameBtn.onclick = (event) => {
      event.preventDefault(); // Prevent the default button behavior
      renameItem(item);
    };
    buttonsContainer.appendChild(renameBtn);
  }

  // Append buttons container to element
  element.appendChild(buttonsContainer);

  if (item.type === "folder" && item.children) {
    item.children.forEach((child) => {
      const childElement = createTreeElement(child);
      element.appendChild(childElement);
    });
  }

  // Add click event listener to remove the item
  element.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent event bubbling
    if (event.target.tagName !== "BUTTON") {
      removeElement(element);
    }
  });

  return element;
}

function removeElement(item) {
  const parentElement = item.parentElement;
  parentElement.removeChild(item);
}

function createFile(parentFolder) {
  const fileName = prompt("Enter the file name:");
  if (fileName) {
    const isFileExist = parentFolder.children.some(
      (child) => child.type === "file" && child.name === fileName
    );
    if (!isFileExist) {
      const newFile = { name: fileName, type: "file" };
      parentFolder.children.push(newFile);
      updateFolderTree();
    } else {
      alert("A file with that name already exists.");
    }
  }
}

function createFolder(parentFolder) {
  const folderName = prompt("Enter the folder name:");
  if (folderName) {
    const isFolderExist = parentFolder.children.some(
      (child) => child.type === "folder" && child.name === folderName
    );
    if (!isFolderExist) {
      const newFolder = { name: folderName, type: "folder", children: [] };
      parentFolder.children.push(newFolder);
      updateFolderTree();
    } else {
      alert("A folder with that name already exists.");
    }
  }
}

function renameItem(item) {
  const newName = prompt(`Enter new name for ${item.name}:`);
  if (newName) {
    item.name = newName;
    updateFolderTree();
  }
}

function updateFolderTree() {
  const folderTree = document.getElementById("folderTree");
  while (folderTree.firstChild) {
    folderTree.removeChild(folderTree.firstChild);
  }
  const treeElement = createTreeElement(folderStructure);
  folderTree.appendChild(treeElement);
}

const folderTree = document.getElementById("folderTree");
const treeElement = createTreeElement(folderStructure);
folderTree.appendChild(treeElement);
