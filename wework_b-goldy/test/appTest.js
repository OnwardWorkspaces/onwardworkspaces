const chai = require('chai');
const chaihttp = require('chai-http');
chai.use(chaihttp);
const assert = chai.assert;
const expect = chai.expect;


describe('App Testing', function () {

    // Auth route

    describe('Register with already exist email', function () {
        it('Register should return User already exist for Email => string', function (done) {
            const req = {
                "name": "string",
                "email": "string",
                "mobile": "string",
                "password": "string",
                "role": "string"
            }
            try {
                chai.request('http://localhost:3001')
                    .post('/register').send(req)
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(202);
                        done();
                    });
            } catch (error) {
                console.log('error', error);
                done();
            }
        });
    });

    const random = Math.random();
    // describe(`Register with new email string${random}`, function () {
    //     it(`Register should registerd successfully for Email => string${random}`, function (done) {
    //         const req = {
    //             "name": "string",
    //             "email": `string${random}`,
    //             "mobile": "string",
    //             "password": "string",
    //             "role": "string"
    //           }
    //         try {
    //             chai.request('http://localhost:3001')
    //                 .post('/register').send(req)
    //                 .end(function (err, res) {
    //                     expect(err).to.be.null;
    //                     expect(res).to.have.status(200);
    //                     done();
    //                 });
    //         } catch (error) {
    //             console.log('error', error);
    //             done();
    //         }
    //     });
    // });

    describe('Login with incorrect email', function () {
        it('login should return Incorrect Email for string321', function (done) {
            const req = {
                "email": "string321",
                "password": "string"
            };
            try {
                chai.request('http://localhost:3001')
                    .post('/login').send(req)
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(404);
                        done();
                    });
            } catch (error) {
                console.log('error', error);
                done();
            }
        })
    });
    describe('Login with incorrect password', function () {
        it('login should return Incorrect password for email => string and password => string321', function (done) {
            const req = {
                "email": "string",
                "password": "string321"
            };
            try {
                chai.request('http://localhost:3001')
                    .post('/login').send(req)
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(400);
                        done();
                    });
            } catch (error) {
                console.log('error', error);
                done();
            }
        })
    });
    describe('Login with correct credentials', function () {
        it('login success with email => string and password => string', function (done) {
            const req = {
                "email": "string",
                "password": "string"
            };
            try {
                chai.request('http://localhost:3001')
                    .post('/login').send(req)
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });                
            } catch (error) {
                console.log('error', error);
                done();
            }
        })
    });

    // User route

    describe('Get user List for admin without authentication token', function () {
        it('Should return error => Unauthorized!', function (done) {
            try {
                chai.request('http://localhost:3001')
                    .get('/user/list')
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(401);
                        done();
                    });
            } catch (error) {
                console.log('error', error);
                done();
            }
        })
    });

    describe('Get user List for admin with authentication token', function () {
        it('Should return data', function (done) {
            try {
                chai.request('http://localhost:3001')
                    .get('/user/list')
                    .set({ Authorization: 'Bareer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjJlMjNmZWI4OTlmYjU4Y2VjYTk5ODAzIiwiZW1haWwiOiJzdHJpbmciLCJyb2xlIjoic3RyaW5nIn0sImlhdCI6MTY1OTA3MDEyOCwiZXhwIjoxNjU5MTQyMTI4fQ.kk69AkO-5PN4a-BAiFFxmIqcoI2S9M-yKuBIu5Qogdw' })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            } catch (error) {
                console.log('error', error);
                done();
            }
        })
    });

    describe('Get user List with query params for pagination', function () {
        it('Should return data of page 2', function (done) {
            try {
                chai.request('http://localhost:3001')
                    .get('/user/list?page=2')
                    .set({ Authorization: 'Bareer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjJlMjNmZWI4OTlmYjU4Y2VjYTk5ODAzIiwiZW1haWwiOiJzdHJpbmciLCJyb2xlIjoic3RyaW5nIn0sImlhdCI6MTY1OTA3MDEyOCwiZXhwIjoxNjU5MTQyMTI4fQ.kk69AkO-5PN4a-BAiFFxmIqcoI2S9M-yKuBIu5Qogdw' })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            } catch (error) {
                console.log('error', error);
                done();
            }
        })
    });

    describe('Get user List with query params for sort', function () {
        it('Should return data by sort ei. role', function (done) {
            try {
                chai.request('http://localhost:3001')
                    .get('/user/list?sort=role')
                    .set({ Authorization: 'Bareer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjJlMjNmZWI4OTlmYjU4Y2VjYTk5ODAzIiwiZW1haWwiOiJzdHJpbmciLCJyb2xlIjoic3RyaW5nIn0sImlhdCI6MTY1OTA3MDEyOCwiZXhwIjoxNjU5MTQyMTI4fQ.kk69AkO-5PN4a-BAiFFxmIqcoI2S9M-yKuBIu5Qogdw' })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            } catch (error) {
                console.log('error', error);
                done();
            }
        })
    });

    describe('Get user details without authentication tokon', function () {
        it('Should return error Unauthorized!', function (done) {
            try {
                chai.request('http://localhost:3001')
                    .post('/user/user')
                    .send({ user_id: '62d7a96ecff8ac1770318059' })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(401);
                        done();
                    });
            } catch (error) {
                console.log('error', error);
                done();
            }
        })
    });

    describe('Get user details with user ID', function () {
        it('Should return user details', function (done) {
            try {
                chai.request('http://localhost:3001')
                    .post('/user/user')
                    .set({ Authorization: 'Bareer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjJlMjNmZWI4OTlmYjU4Y2VjYTk5ODAzIiwiZW1haWwiOiJzdHJpbmciLCJyb2xlIjoic3RyaW5nIn0sImlhdCI6MTY1OTA3MDEyOCwiZXhwIjoxNjU5MTQyMTI4fQ.kk69AkO-5PN4a-BAiFFxmIqcoI2S9M-yKuBIu5Qogdw' })
                    .send({ user_id: '62e23feb899fb58ceca99803' })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            } catch (error) {
                console.log('error', error);
                done();
            }
        })
    });
    describe('Add user by admin without authentication', function () {
        it('Should return error Unauthorized!', function (done) {
            try {
                chai.request('http://localhost:3001')
                    .post('/user/add')
                    // .set({ Authorization: 'Bareer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjJlMjNmZWI4OTlmYjU4Y2VjYTk5ODAzIiwiZW1haWwiOiJzdHJpbmciLCJyb2xlIjoic3RyaW5nIn0sImlhdCI6MTY1OTA3MDEyOCwiZXhwIjoxNjU5MTQyMTI4fQ.kk69AkO-5PN4a-BAiFFxmIqcoI2S9M-yKuBIu5Qogdw' })
                    .send({ email: 'string' })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(401);
                        done();
                    });
            } catch (error) {
                console.log('error', error);
                done();
            }
        })
    });
    describe('Add user by admin with already exist email', function () {
        it('Should return error this user already exist!', function (done) {
            try {
                chai.request('http://localhost:3001')
                    .post('/user/add')
                    .set({ Authorization: 'Bareer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjJlMjNmZWI4OTlmYjU4Y2VjYTk5ODAzIiwiZW1haWwiOiJzdHJpbmciLCJyb2xlIjoic3RyaW5nIn0sImlhdCI6MTY1OTA3MDEyOCwiZXhwIjoxNjU5MTQyMTI4fQ.kk69AkO-5PN4a-BAiFFxmIqcoI2S9M-yKuBIu5Qogdw' })
                    .send({ email: 'string' })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(208);
                        done();
                    });
            } catch (error) {
                console.log('error', error);
                done();
            }
        })
    });
    // describe(`Add user by admin with new email string${random}`, function () {
    //     it('Should save the user and return details!', function (done) {
    //         try {
    //             chai.request('http://localhost:3001')
    //                 .post('/user/add')
    //                 .set({ Authorization: 'Bareer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjJlMjNmZWI4OTlmYjU4Y2VjYTk5ODAzIiwiZW1haWwiOiJzdHJpbmciLCJyb2xlIjoic3RyaW5nIn0sImlhdCI6MTY1OTA3MDEyOCwiZXhwIjoxNjU5MTQyMTI4fQ.kk69AkO-5PN4a-BAiFFxmIqcoI2S9M-yKuBIu5Qogdw' })
    //                 .send({
    //                     "name": "string",
    //                     "userStatus": "string",
    //                     "assignManager": "62e134a9b8522d91401c1dc8",
    //                     "currency": "string",
    //                     "isSalesManager": true,
    //                     "description": "string",
    //                     "isTokenVerified": true,
    //                     "attributionMethod": "string",
    //                     "emailAttributionMethod": "string",
    //                     "isVariableExposed": true,
    //                     "internalNote": "string",
    //                     "isAddressEnabled": true,
    //                     "address_line_1": "string",
    //                     "address_line_2": "string",
    //                     "city": "string",
    //                     "postalCode": "string",
    //                     "country": "string",
    //                     "billingFrequency": "string",
    //                     "isPaymentMethod": true,
    //                     "paymentMethod": "string",
    //                     "taxID": "string",
    //                     "isAutoInvoice": true,
    //                     "invoiceDate": "string",
    //                     "invoiceGenDelayMethod": "string",
    //                     "invoiceGenDelay": "string",
    //                     "autoInvoiceCreationThre": "string",
    //                     "isDefaultPaymentMethod": true,
    //                     "defaultPaymentTerms": "string",
    //                     "isInvoiceHideFromAff": true,
    //                     "platformDetails": "string",
    //                     "platformUrl": "string",
    //                     "platformUsername": "string",
    //                     "timezone": "string",
    //                     "accountingEmail": "string",
    //                     "offerIdParam": "string",
    //                     "affiliateId": "string",
    //                     "role": "string",
    //                     "email": `string${random}`,
    //                     "mobile": "string",
    //                     "workMobile": "string",
    //                     "language": "string",
    //                     "activationEmail": true,
    //                     "isPasswordManual": true,
    //                     "password": "string"
    //                   })
    //                 .end(function (err, res) {
    //                     expect(err).to.be.null;
    //                     expect(res).to.have.status(200);
    //                     done();
    //                 });
    //         } catch (error) {
    //             console.log('error', error);
    //             done();
    //         }
    //     })
    // });
    describe('Update user by admin without authentication', function () {
        it('Should return error Unauthorized!', function (done) {
            try {
                chai.request('http://localhost:3001')
                    .put('/user/update')
                    // .set({ Authorization: 'Bareer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjJlMjNmZWI4OTlmYjU4Y2VjYTk5ODAzIiwiZW1haWwiOiJzdHJpbmciLCJyb2xlIjoic3RyaW5nIn0sImlhdCI6MTY1OTA3MDEyOCwiZXhwIjoxNjU5MTQyMTI4fQ.kk69AkO-5PN4a-BAiFFxmIqcoI2S9M-yKuBIu5Qogdw' })
                    .send({ email: 'string' })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(401);
                        done();
                    });
            } catch (error) {
                console.log('error', error);
                done();
            }
        })
    });
    describe(`Update user by admin`, function () {
        it('Should update the user and return details!', function (done) {
            try {
                chai.request('http://localhost:3001')
                    .put('/user/update')
                    .set({ Authorization: 'Bareer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjJlMjNmZWI4OTlmYjU4Y2VjYTk5ODAzIiwiZW1haWwiOiJzdHJpbmciLCJyb2xlIjoic3RyaW5nIn0sImlhdCI6MTY1OTA3MDEyOCwiZXhwIjoxNjU5MTQyMTI4fQ.kk69AkO-5PN4a-BAiFFxmIqcoI2S9M-yKuBIu5Qogdw' })
                    .send({
                        "name": "string",
                        "userStatus": "Active",
                        "assignManager": "62e134a9b8522d91401c1dc8",
                        "currency": "string",
                        "isSalesManager": true,
                        "description": "string",
                        "isTokenVerified": true,
                        "attributionMethod": "string",
                        "emailAttributionMethod": "string",
                        "isVariableExposed": true,
                        "internalNote": "string",
                        "isAddressEnabled": true,
                        "address_line_1": "string",
                        "address_line_2": "string",
                        "city": "string",
                        "postalCode": "string",
                        "country": "string",
                        "billingFrequency": "string",
                        "isPaymentMethod": true,
                        "paymentMethod": "string",
                        "taxID": "string",
                        "isAutoInvoice": true,
                        "invoiceDate": "string",
                        "invoiceGenDelayMethod": "string",
                        "invoiceGenDelay": "string",
                        "autoInvoiceCreationThre": "string",
                        "isDefaultPaymentMethod": true,
                        "defaultPaymentTerms": "string",
                        "isInvoiceHideFromAff": true,
                        "platformDetails": "string",
                        "platformUrl": "string",
                        "platformUsername": "string",
                        "timezone": "string",
                        "accountingEmail": "string",
                        "offerIdParam": "string",
                        "affiliateId": "string",
                        "role": "Publisher",
                        "user_id": "62e23feb899fb58ceca99803",
                        "mobile": "string",
                        "workMobile": "string",
                        "language": "string",
                        "activationEmail": true,
                        "isPasswordManual": true,
                      })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            } catch (error) {
                console.log('error', error);
                done();
            }
        })
    });

    describe('Delete user by admin without authentication', function () {
        it('Should return error Unauthorized!', function (done) {
            try {
                chai.request('http://localhost:3001')
                    .post('/user/delete')
                    // .set({ Authorization: 'Bareer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjJlMjNmZWI4OTlmYjU4Y2VjYTk5ODAzIiwiZW1haWwiOiJzdHJpbmciLCJyb2xlIjoic3RyaW5nIn0sImlhdCI6MTY1OTA3MDEyOCwiZXhwIjoxNjU5MTQyMTI4fQ.kk69AkO-5PN4a-BAiFFxmIqcoI2S9M-yKuBIu5Qogdw' })
                    .send({ user_id: '62e25685d2e44d0c8045e7cc' })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(401);
                        done();
                    });
            } catch (error) {
                console.log('error', error);
                done();
            }
        })
    });

    describe('Delete user by admin', function () {
        it('Should delete user successfully!', function (done) {
            try {
                chai.request('http://localhost:3001')
                    .post('/user/delete')
                    .set({ Authorization: 'Bareer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjJlMjNmZWI4OTlmYjU4Y2VjYTk5ODAzIiwiZW1haWwiOiJzdHJpbmciLCJyb2xlIjoic3RyaW5nIn0sImlhdCI6MTY1OTA3MDEyOCwiZXhwIjoxNjU5MTQyMTI4fQ.kk69AkO-5PN4a-BAiFFxmIqcoI2S9M-yKuBIu5Qogdw' })
                    .send({ user_id: '62e25685d2e44d0c8045e7cc' })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            } catch (error) {
                console.log('error', error);
                done();
            }
        })
    });

    describe('Update user status by admin without authentication', function () {
        it('Should return error Unauthorized!', function (done) {
            try {
                chai.request('http://localhost:3001')
                    .put('/user/status')
                    // .set({ Authorization: 'Bareer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjJlMjNmZWI4OTlmYjU4Y2VjYTk5ODAzIiwiZW1haWwiOiJzdHJpbmciLCJyb2xlIjoic3RyaW5nIn0sImlhdCI6MTY1OTA3MDEyOCwiZXhwIjoxNjU5MTQyMTI4fQ.kk69AkO-5PN4a-BAiFFxmIqcoI2S9M-yKuBIu5Qogdw' })
                    .send({ user_id: '62e25685d2e44d0c8045e7cc', userStatus:'InActive' })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(401);
                        done();
                    });
            } catch (error) {
                console.log('error', error);
                done();
            }
        })
    });

    describe('Update user status by admin without authentication', function () {
        it('Should update user status to InActive', function (done) {
            try {
                chai.request('http://localhost:3001')
                    .put('/user/status')
                    .set({ Authorization: 'Bareer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjJlMjNmZWI4OTlmYjU4Y2VjYTk5ODAzIiwiZW1haWwiOiJzdHJpbmciLCJyb2xlIjoic3RyaW5nIn0sImlhdCI6MTY1OTA3MDEyOCwiZXhwIjoxNjU5MTQyMTI4fQ.kk69AkO-5PN4a-BAiFFxmIqcoI2S9M-yKuBIu5Qogdw' })
                    .send({ user_id: '62e25685d2e44d0c8045e7cc', userStatus:'InActive' })
                    .end(function (err, res) {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        done();
                    });
            } catch (error) {
                console.log('error', error);
                done();
            }
        })
    });
})