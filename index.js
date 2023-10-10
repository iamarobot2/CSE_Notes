exports.handler = async (req, res) => {
    const file = req.files.file;
    const notesFolderPath = `${process.cwd()}/notes`;
  
    try {
      await file.save(notesFolderPath);
      res.status(200).send('File uploaded successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while uploading the file.');
    }
  };
  
  exports.handler = async (req, res) => {
    const filePath = req.query.filePath;
    await fs.unlink(filePath);

    res.status(200).send('File deleted successfully!');
  };
  