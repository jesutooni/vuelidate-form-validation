<template>
  <div class="card mt-5 mb-5">
    <h1 class="card-header text-center">Contact Us</h1>
    <div v-if="!submitted" class="card-body">
      <form @submit.prevent="submitForm" method="post">
        <div class="form-group">
          <label for="name">Name<span>*</span></label>
          <input id="name" type="text" v-model="name" class="form-control" :class="{success:!$v.name.$error && $v.name.$dirty}" @blur="$v.name.$touch()">
          
          <template v-if="$v.name.$error">
            <span v-if="!$v.name.required" class="text-danger">Name is required!</span>
            <span v-if="!$v.name.minLength" class="text-danger">Name must have at least {{ $v.name.$params.minLength.min }} letters.</span>
            <span v-if="!$v.name.maxLength" class="text-danger">Name must not exceed {{ $v.name.$params.maxLength.max }} characters.</span>
          </template>  
        </div>

        <div class="form-group">
          <label for="email">Email<span>*</span></label>
          <input id="email" type="email" v-model="email" class="form-control" :class="{success:!$v.email.$error && $v.email.$dirty}" @blur="$v.email.$touch()">

          <template v-if="$v.email.$error">
            <span v-if="!$v.email.required" class="text-danger">Email is required!</span>
            <span v-if="!$v.email.email" class="text-danger">Email is not valid!</span> 
          </template>
          
        </div>

        <div class="form-group">
          <label for="subject">Subject</label>
          <input id="subject" type="text" v-model="subject" class="form-control">
          
          <span v-if="!$v.subject.maxLength" class="text-danger">Subject must not exceed {{ $v.subject.$params.maxLength.max }} characters.</span>
        </div>

        <div class="form-group">
          <label for="message">Message<span>*</span></label>
          <textarea id="message" cols="30" rows="10" v-model="message" class="form-control" :class="{success:!$v.message.$error && $v.message.$dirty}" @blur="$v.message.$touch()"></textarea>

          <template v-if="$v.message.$error">
            <span v-if="!$v.message.required" class="text-danger">Message is required!</span>
            <span v-if="!$v.message.maxLength" class="text-danger">Message must not exceed {{ $v.message.$params.maxLength.max }} characters.</span>
          </template>
        </div>

        <button type="submit" class="btn btn-primary mt-2">Send</button>
      </form>
    </div>

    <div v-if="submitted" class="text-center">
      <i class="bi bi-check2-circle scale-3"></i>
      <h1>Sent Successfully</h1>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'contactForm',
  data () {
    return {
      name: '',
      email: '',
      subject: '',
      message: '',
      submitted: false
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(50)
    },
    email: {
      required,
      email
    },
    subject: {
      maxLength: maxLength(100)
    },
    message: {
      required,
      maxLength: maxLength(500)      
    }
  },
  methods: {
    submitForm() {
      this.$v.$touch();
      if(!this.$v.$invalid) {
        this.$axios.post('https://5d9f7fe94d823c0014dd323d.mockapi.io/api', {
          name: this.name,
          email: this.email,
          subject: this.subject,
          message: this.message
        }).then(data => {
          console.log(data);
          this.submitted = true
        })
      }
      }
    }

}
</script>


<style scoped>
  .card {
    max-width: 600px;
    margin: 0 auto;
  }
  .form-control:focus {
    box-shadow: none;
    
  }

  .form-group label span {
    color: red;
  }

  .success {
    border-color: #0f0;
  }

  .success:focus {
    border-color: #0f0;
  }
</style>
