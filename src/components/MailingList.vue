<template>
<div class="section mailing-list">
  <!-- Begin Mailchimp Signup Form -->
  <div id="mc_embed_signup">
    <form
      :action="`https://band.us20.list-manage.com/subscribe/post?u=48a094c6108f02aa701cddbb4&amp;id=18b794c854`"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      class="validate"
      target="_blank"
      novalidate
    >
      <div class="columns">
        <h2 class="column">Stay in touch</h2>
          <div class="column">
            <div class="has-icons-left has-icons-right control">
              <input type="email" value="" name="EMAIL" aria-label="Email Address" placeholder="Email" autocomplete="email" class="email input is-large" id="mce-EMAIL">
              <span class="icon is-small is-left">
                <svg class="svg-inline--fa fa-envelope fa-w-16" style="height: 24px; width: 24px" aria-hidden="true" data-prefix="fas" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>
              </span>
            </div>
          </div>
          <div id="mce-responses" class="clear">
            <div class="response" id="mce-error-response" style="display:none"></div>
            <div class="response" id="mce-success-response" style="display:none"></div>
          </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
          <div style="position: absolute; left: -5000px;" aria-hidden="true">
            <input type="text" name="b_48a094c6108f02aa701cddbb4_18b794c854" tabindex="-1" value="">
          </div>
          <div class="column">
            <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
          </div>
      </div>
    </form>
  </div>
  <!-- <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script>
  <script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);</script> -->
  <!--End mc_embed_signup-->
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MailingList extends Vue {
}
</script>

<style lang="scss" scoped>
.flex-form {
  display: flex;
  flex-direction: row;
  justify-content: center;

}

.mailing-list {
  background-color: whitesmoke;
}

.columns {
  .column {
    display: flex;
    justify-content: center;
    align-items: center;
    
    

    .button {
      background-color: #a25387;
      color: whitesmoke;
    }
  }
}
</style>