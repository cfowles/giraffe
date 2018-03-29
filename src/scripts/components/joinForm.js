

  // $('form#formSelection').submit(function (e) {
  //   var mobile = $('#mobile_phone').val().replace(/\D/g, '');
  //   if (mobile && mobile.length >= 10) {
  //     if ($('#email').val() === '') {
  //       $('#id_suppress_subscribe').val('1');
  //       $('#email').val(mobile+'-smssubscriber@example.com');
  //     }
  //     //$('#id_sms_subscribed').val('sms_subscribed');
  //     $('#id_sms_termsandconditions').val('sms_termsandconditions');
  //     $('#id_action_mobilesubscribe').val('mobilesubscribe');
  //     $('#id_robodial_termsandconditions').val('yes');
  //   } 
  //   if (($('#email').val() === '' && $('#mobile_phone').val() === '')
  //       || $('#user_name').val() === '' || $('#signup-zip').val() === '') {
  //     e.preventDefault();
  //     $('span#please-fill-out').removeClass('hide');
  //     return !1
  //   }
  // });
import { entries as getFormEntries } from '../utilities/formData';

class JoinForm {

  constructor( $element) {

    this.$form = $($element);

    this.$name = this.$form.find('[name="name"]');
    this.$zip = this.$form.find('[name="zip"]')
    this.$email = this.$form.find('[name="email"]');
    this.$mobile = this.$form.find('[name="mobile_phone"]');

    this.$page = this.$form.find('[name="page"]');
    this.$posted = this.$form.find('[name="posted"]');
    this.$formName = this.$form.find('[name="form_name"]');
    this.$source = this.$form.find('[name="source"]');
    this.$actionReferrer = this.$form.find('[name="action_referrer"]');
    this.$country = this.$form.find('[name="country"]');

    this.$subscribeSMSConditions = this.$form.find('.subscribe-sms-conditions');
    this.$suppressEmailSubscribe = this.$form.find('[name="suppress_subscribe"]');
    this.$smsTerms = this.$form.find('[name="user_sms_termsandconditions"]');
    this.$smsSubscribe = this.$form.find('[name="action_mobilesubscribe"]');
    this.$robodialTerms = this.$form.find('[name="user_robodial_termsandconditions"]');
    this.$userSmsSubscribe = this.$form.find('[name="user_sms_subscribed"]');


    this.$submit = this.$form.find('[type="submit"]');

    this.formData = {};
    this.bindform();
  }

  bindform() {
    let _this = this;
    this.$form.on('change keyup', function () {
      // let currentFormData = new FormData(_this.$form[0]);
      // let entries = [];
      // let formData = {};

      // // Safari doesnt support FormData.prototype.values
      // if ( currentFormData.entries ) {
      //   entries = Array.from(currentFormData.entries());
      // } else {
      //   entries = getFormEntries(_this.$form[0]);
      // }

      // entries.map( entry => formData[entry[0]] = entry[1]);
      if (_this.$mobile[0].value.replace(/\D/g,'').length >= 10) {
        _this.$userSmsSubscribe[0].checked = true;
        if (_this.$subscribeSMSConditions[0].className.search("unhide") == -1) {
          _this.$subscribeSMSConditions[0].className += " unhide";
        }
      }
    });
    this.$form.on('submit', function (e) {
      const mobile = _this.$mobile[0].value.replace(/\D/g, '');
      const email = _this.$email[0].value;
      const name = _this.$name[0].value;
      const zip = _this.$zip[0].value;

      if (email === '' && mobile === '' || name === '' || zip === '') {
        e.preventDefault();
        alert("something's missing"); // TODO: Show informative error message
        return !1
      }

      if (mobile && mobile.length >= 10) {
        if (email === '') {
          _this.$suppressEmailSubscribe.value = 1;
          _this.$email[0].value = mobile+'-smssubscriber@example.com';
        }
        _this.$smsTerms[0].value = 'sms_termsandconditions';
        _this.$smsSubscribe[0].value = 'mobilesubscribe';
        _this.$robodialTerms.value = 'yes';
      }
    });
  }
}


export default {

  init() {

    let $joinform = $('.join-form');

    $joinform.each(function (index, el) {
      let _form = new JoinForm(el);
    });

  }

}



