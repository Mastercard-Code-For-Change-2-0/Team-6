// ...existing code...
const axios = require('axios'); // Add this at the top

router.post('/admin/upload-csv', isAdmin, upload.single('csvfile'), async (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            let created = [];
            for (const row of results) {
                try {
                    // Call signup API instead of direct DB insert
                    const response = await axios.post('http://localhost:3000/signup', {
                        emailId: row.email,
                        password: row.password || 'default123',
                        role: row.role || 'student',
                        firstName: row.firstName || '',
                        surname: row.surname || '',
                        mobileNumber: row.mobileNumber || '',
                        isActive: true
                    });
                    if (response.status === 201) {
                        await sendMail(row.email, row.password || 'default123');
                        created.push(row.email);
                    }
                } catch (err) {
                    // skip errors
                }
            }
            res.json({ created });
        });
});
// ...existing code...