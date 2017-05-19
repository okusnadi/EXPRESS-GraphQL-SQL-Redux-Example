import * as passport from 'passport';
import * as Passport from 'passport-twitter';
import {oAuthLoginFunction} from '../../database/ControllerPassport';
import {twitter, twitterID, twitterUsername} from '../../Strings';
import {twitterConsumer, twitterSecret} from './config';

const TwitterLoginFunction: oAuthTwitter = async (token, tokenSecret, profile, cb) => {
    const {_json, displayName, id} = profile;
    const {email, profile_image_url} = _json;
    const parameters = {
        email,
        SocialDatabaseIDRow: twitterID,
        SocialID: id,
        SocialDatabaseUsernameRow: twitterUsername,
        socialDisplayName: displayName,
        avatar: profile_image_url
    };
    oAuthLoginFunction(parameters, cb);

};

passport.use(twitter, new Passport.Strategy({
        consumerKey: `${twitterConsumer}`,
        consumerSecret: `${twitterSecret}`,
        callbackURL: 'http://localhost:3000/auth/twitter/callback',
        includeEmail: true
    }, TwitterLoginFunction
));
