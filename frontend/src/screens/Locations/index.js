import React, { useContext } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { StoreContext } from '../../store/reducer/StoreProvider';
import useStylesCommon from '../stylesCommon';
import messages from './messages';

const Locations = ({ intl: { formatMessage } }) => {
  const { dispatch, state } = useContext(StoreContext);
  const classesCommon = useStylesCommon();

  return (
    <div className={classesCommon.root}>
      <Typography variant="h1">{formatMessage(messages.title)}</Typography>
    </div>
  );
};

Locations.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Locations);
