import RingCentral from '@rc-ex/core';
import PubNubExtension from '@rc-ex/pubnub';

const rc = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER_URL,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});

const main = async () => {
  await rc.authorize({
    username: process.env.RINGCENTRAL_USERNAME!,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password: process.env.RINGCENTRAL_PASSWORD!,
  });

  // const extInfo = await rc.restapi().account().extension().get();
  // console.log(JSON.stringify(extInfo, null, 2));

  const pubnubExt = new PubNubExtension();
  await rc.installExtension(pubnubExt);
  const subInfo = await pubnubExt.subscribe(
    ['/restapi/v1.0/account/~/telephony/sessions'],
    event => {
      console.log(JSON.stringify(event, null, 2));
    }
  );
  console.log(JSON.stringify(subInfo._subscriptionInfo, null, 2));
};

main();
