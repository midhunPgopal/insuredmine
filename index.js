const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const userModel = require('./models/dataSchema');
const excelToJson = require('convert-excel-to-json');
const bodyParser = require('body-parser');
const fs = require('fs')
const route = require('./routes/routes')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

mongoose.connect('mongodb+srv://user:user@cluster0.tej6f.mongodb.net/test', { useNewUrlParser: true })
    .then(() => console.log('connected to db'))
    .catch((err) => console.log(err))

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/uploadfile', upload.single("uploadfile"), (req, res) => {
    importExcelData2MongoDB(__dirname + '/public/uploads/' + req.file.filename, res);
});

function importExcelData2MongoDB(filePath, res) {

    const excelData = excelToJson({
        sourceFile: filePath,
        sheets: [{

            name: 'Customers',

            header: {
                rows: 1
            },

            columnToKey: {
                A: 'agent',
                B: 'userType',
                C: 'policy_mode',
                D: 'producer',
                E: 'policy_number',
                F: 'premium_amount_written',
                G: 'premium_amount',
                H: 'policy_type',
                I: 'company_name',
                J: 'category_name',
                K: 'policy_start_date',
                L: 'policy_end_date',
                M: 'csr',
                N: 'account_name',
                O: 'email',
                P: 'gender',
                Q: 'firstname',
                R: 'city',
                S: 'account_type',
                T: 'phone',
                U: 'address',
                V: 'state',
                W: 'zip',
                X: 'dob',
                Y: 'primary',
                Z: 'Applicant_ID',
                AA: 'agency_id',
                AB: 'hasActive_ClientPolicy',
                AC: 'ClientPolicy'
            }
        }]
    });
    userModel.insertMany(excelData, (err, data) => {
        if (err) {
            console.log('error')
        } else {
            console.log('success')
            res.redirect('/')
        }
    });
    fs.unlinkSync(filePath);
}

//for CRUD operations
app.use('/user', route)
app.use('/account', route)
app.use('/policy', route)

app.listen(3000, () => console.log('server running at port: ' + 3000));  