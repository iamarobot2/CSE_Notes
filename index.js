exports.handler = async (req, res) => {
    const file = req.files.file;
    const notesFolderPath = `${process.cwd()}/notes`;
    await file.save(notesFolderPath);
    res.status(200).send('File uploaded successfully!');
  };
  exports.handler = async (req, res) => {
    const filePath = req.query.filePath;
    await fs.unlink(filePath);
    res.status(200).send('File deleted successfully!');
  };
  
  