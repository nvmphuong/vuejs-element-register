<template>
  <el-container>
    <el-header>
      <h1>Register Form</h1>
    </el-header>
    <el-container>
      <el-main v-loading="isSubmit">
        <el-form
          ref="form"
          :model="form"
          status-icon
          :rules="rules"
          label-width="120px"
          @keyup.enter.native="submitForm('form')"
        >
          <el-form-item label="Country" prop="country">
            <el-select
              v-model="form.country"
              v-loading="!isCountryDataReady"
              filterable
              placeholder="Select"
            >
              <el-option
                v-for="(item , index) in countries"
                :key="index"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email" type="email" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Password" prop="pass">
            <el-input v-model="form.pass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Confirm" prop="checkPass">
            <el-input v-model="form.checkPass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button :disabled="isSubmit" type="primary" @click="submitForm('form')">Submit</el-button>
          </el-form-item>
        </el-form>

      </el-main>
    </el-container>
  </el-container>

</template>

<script>
    import Validator from '@/utils/validator'
    import { mapGetters } from 'vuex'

    export default {
        name: 'RegisterPage',
        data() {
            return {
                form: {
                    country: '',
                    email: '',
                    pass: '',
                    checkPass: ''
                },
                isSubmit: false,
                // All validate rules
                rules: {
                    country: [
                        {
                            validator: (rule, value, callback) => {
                                if (Validator.isEmpty(value)) {
                                    callback(new Error('Please select country'))
                                } else {
                                    callback()
                                }
                            }, trigger: 'change'
                        }
                    ], email: [
                        {
                            validator: (rule, value, callback) => {
                                if (!Validator.isValidEmail(value)) {
                                    callback(new Error('Email is invalid'))
                                } else {
                                    callback()
                                }
                            }, trigger: 'blur'
                        }
                    ],
                    pass: [
                        {
                            validator: (rule, value, callback) => {
                                if (Validator.isEmpty(value)) {
                                    callback(new Error('Please input the password'))
                                } else if (!Validator.minLength(6, value)) {
                                    callback(new Error('Password at least 6 characters'))
                                } else {
                                    callback()
                                }
                            }, trigger: 'blur'
                        }
                    ],
                    checkPass: [
                        {
                            validator: (rule, value, callback) => {
                                if (Validator.isEmpty(value)) {
                                    callback(new Error('Please input the password again'))
                                } else if (value !== this.form.pass) {
                                    callback(new Error('Two inputs don\'t match!'))
                                } else {
                                    callback()
                                }
                            }, trigger: 'blur'
                        }
                    ]
                }
            }
        },
        computed: {
            ...mapGetters([
                'countries',
                 'isCountryDataReady'
            ])
        },
        mounted() {
            // Call store init data from api
            this.$store.dispatch('countries/loadData')
        },
        methods: {
            submitForm(formName) {
                // Validate form before push to server
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isSubmit = true
                        setTimeout(() => {
                            this.isSubmit = false
                            this.$alert('Registered successfully!', 'Success!', {
                                confirmButtonText: 'OK',
                                type: 'success',
                                center: true,
                                showClose: false
                            }).then(res => {
                                window.location.reload()
                            })
                        }, 3000)
                    } else {
                        return false
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .el-select {
        width: 100%
    }

    .el-form {
        width: 500px;
        max-width: 90vw;
        margin: 0 auto
    }
</style>
