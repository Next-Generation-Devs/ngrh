# The use-download-media hook 🚀

This hook will help you to download sources from internet locally and will give you a loading state.

## Usage ⚒️

This hook run fully by vanilla [fetch api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and there is no need to add any extra packages to it.

The hook take no params to run.

The hook return an object that contains 4 values:

- `download` ⬇️: the main function of this hook. this function downloads the source to the local browser (like MEGA) so that you'll be able to download it locally. this function takes an object of options as a parameter:
- - `url`: the url of the source.
- - `fileName`: the name of the file (should include the extension. _defaults to the source name_).
- - `id`: the id to identify the file (used in `getLoadingById` and `downloadToLocal`).
- - `withAutoDownload`: a flag to determine if the file will be downloaded automatically after being downloaded to the borwser or not (_defaults to false_).
- `getLoadingById` 📶: a function that returns the **progress** of the download function. the function takes the file id as a parameter.
- `files` 📁: the files that have downloaded. This array contains all the files chunks and their downloading state so you can manipulate them as you wish.
- `downloadToLocal` 🗃️: a function that downloads the file with a specific id. the function takes the file id as a parameter.

## Examples 💥

Using the hook to download any file with the given url 🪝:

```js
import useDownloadMedia from "ngrh/use-download-media";

const Page = () => {
  const { download } = useDownloadMedia();

  return (
    <button
      onClick={() =>
        download({
          url: "SOME_SOURCE",
          id: "ANYTHING",
          withAutoDownload: true,
          fileName: "Name.Extension",
        })
      }
    >
      download
    </button>
  );
};
```

You might as well want to use the files before downloading them to make some updates and then proceed to download:

```js
import useDownloadMedia from "ngrh/use-download-media";

const Page = () => {
  const { download, files, downloadToLocal } = useDownloadMedia();
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    await download({
      url: "SOME_SOURCE",
      id: "ID",
      fileName: "Name.Extension",
    });
    setDownloaded(true);
  };

  // do whatever you want with files before click again to download the file to the pc.

  const handleDownloadLocally = () => {
    downloadToLocal("ID");
  };

  return (
    <button
      onClick={async () => {
        if (downloaded) {
          handleDownloadLocally();
        } else {
          await handleDownload();
        }
      }}
    >
      download
    </button>
  );
};
```

You can also show the download progress 📶:

```js
import useDownloadMedia from "ngrh/use-download-media";

const Page = () => {
  const { download, getLoadingById } = useDownloadMedia();

  return (
    <div>
      <button
        onClick={() =>
          download({
            url: "SOME_SOURCE",
            id: "ID",
            withAutoDownload: true,
            fileName: "Name.Extension",
          })
        }
      >
        download
      </button>
      <span>Loading State: {getLoadingById("ID")}</span>
    </div>
  );
};
```

## License ✅

MIT
