import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('project funnel counts first interaction and reached-contact once per enquiry', () => {
 const form=read('components/ProjectForm.tsx');
 assert.match(form,/project_form_started/);
 assert.match(form,/project_form_contact_reached/);
 assert.match(form,/startedRef\.current/);
 assert.match(form,/contactReachedRef\.current/);
 assert.match(form,/onInputCapture=\{trackFirstInteraction\}/);
 assert.match(form,/onChangeCapture=\{trackFirstInteraction\}/);
 assert.match(form,/startedRef\.current=false;contactReachedRef\.current=false/);
});

test('validation and submit events never contain name, phone, email, notes or location values', () => {
 const form=read('components/ProjectForm.tsx');
 assert.match(form,/project_form_validation_blocked/);
 assert.match(form,/allowed=\['site_location','site_stage','lead_intent'/);
 assert.match(form,/invalidFieldsRef\.current\.has\(key\)/);
 assert.match(form,/onInvalidCapture=\{event=>trackValidationBlock/);
 assert.match(form,/project_form_submit_attempt/);
 assert.match(form,/trackEvent\('project_enquiry'/);
 assert.match(form,/trackEvent\('project_enquiry_error'/);
 const f=form.slice(form.indexOf('const trackValidationBlock='),form.indexOf(' const update='));
 assert.doesNotMatch(f,/form\.(name|phone|email|notes|location)/);
});

test('analytics events do not transmit free-text URL query parameters', () => {
 const analytics=read('components/Analytics.tsx');
 const lib=read('lib/analytics.ts');
 assert.match(analytics,/page_path: pathname,/);
 assert.match(analytics,/page_location: window\.location\.origin \+ pathname,/);
 assert.match(analytics,/send_page_view:false,page_location:window\.location\.origin\+window\.location\.pathname/);
 assert.doesNotMatch(analytics,/page_location: window\.location\.href/);
 assert.match(lib,/landingPath: window\.location\.pathname\.slice/);
 assert.match(lib,/utmSource \? 'unspecified'/);
 assert.match(lib,/first_landing_path: attribution\.landingPath\.split\('\?'\)\[0\]/);
 assert.match(lib,/firstLandingPath: attribution\?\.landingPath\.split\('\?'\)\[0\]/);
});
