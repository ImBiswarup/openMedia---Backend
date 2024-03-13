

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error uploading file' });
        } else {
            const newPost = new Post({
                username: req.body.username,
                desc: req.body.desc,
                image: req.file.filename,
                time: new Date()
            });
            newPost.save()
                .then(() => res.status(201).json({ message: 'Post created successfully' }))
                .catch(err => res.status(500).json({ error: 'Error saving post to database' }));
        }
    });
});