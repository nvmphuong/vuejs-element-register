<template>
    <el-container>
        <el-header>
            <h1>Register Form</h1>
        </el-header>
        <el-container>
            <el-main>
                <el-row :gutter="20">
                    <el-col :span="8" :offset="8">
                        <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px"
                                 class="demo-form">

                            <el-form-item label="Email" prop="email">
                                <el-input type="mail" v-model="form.email" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="Password" prop="pass">
                                <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="Confirm" prop="checkPass">
                                <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('form')">Submit</el-button>
                                <el-button @click="resetForm('form')">Reset</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </el-container>


</template>

<script>
    import Validator from '@/classes/validator'

    export default {
        name: 'Home',
        props: {
            msg: String
        },
        data() {
            console.log(111,Validator)

            var validatePass = (rule, value, callback) => {
                if ( value === '' ) {
                    callback(new Error('Please input the password'));
                } else {
                    if ( this.form.checkPass !== '' ) {
                        this.$refs.form.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if ( value === '' ) {
                    callback(new Error('Please input the password again'));
                } else if ( value !== this.form.pass ) {
                    callback(new Error('Two inputs don\'t match!'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    email: '',
                    pass: '',
                    checkPass: '',
                    age: ''
                },
                rules: {
                    email: [
                        { validator: (rule, value, callback) => {
                            if ( Validator.isValidEmail(value) ) {
                                callback(new Error('Email is invalid!'));
                            }else {
                                callback();
                            }
                        }, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {

                this.$refs[formName].validate((valid) => {
                    if ( valid ) {
                        return true

                    } else {
                        return false
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
