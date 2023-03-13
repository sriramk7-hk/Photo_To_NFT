export default function UploadFile() {
  return (
    <div>
      <img alt="Upload File within size of 10MB" />
      <button onClick={handeleFiles}>Upload File</button>
    </div>
  );
}

let fileHandle;
let directory = "./public/"
async function handeleFiles() {
  const options = {
    types: [
      {
        description: "Images",
        accept: {
          "image/*": [".png", ".gif", ".jpeg", ".jpg"],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  };
  [fileHandle] = await window.showOpenFilePicker(options);

  let file = await fileHandle.getFile();

  await file.move(directory, "Name");
  
}
