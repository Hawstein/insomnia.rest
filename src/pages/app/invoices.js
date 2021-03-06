import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as session from '../../lib/session';
import App from '../../lib/app-wrapper';

class Invoices extends React.Component {
  state = {
    invoices: null,
    invoiceExtra: '',
    invoiceExtraDirty: false,
    invoiceExtraLoading: false,
    invoiceExtraError: '',
    hasSaved: false
  };

  async componentDidMount() {
    const { whoami } = this.props;
    this.setState({ invoiceExtra: whoami.invoiceExtra });

    const invoices = await session.invoices();
    this.setState({ invoices });
  }

  async _handleDownloadInvoice(invoiceId) {
    const { downloadLink } = await session.getInvoice(invoiceId);
    window.location = downloadLink;
  }

  _handleInvoiceExtraChange(e) {
    const { value } = e.currentTarget;
    this.setState({ invoiceExtra: value, invoiceExtraDirty: true });
  }

  async _handleInvoiceExtraSubmit(e) {
    const { invoiceExtra } = this.state;

    e.preventDefault();

    this.setState({ invoiceExtraLoading: true });

    try {
      await session.updateInvoiceExtra(invoiceExtra);
      this.setState({
        invoiceExtraDirty: false,
        invoiceExtraError: '',
        invoiceExtraLoading: false,
        hasSaved: true,
      });
    } catch (err) {
      this.setState({
        invoiceExtraError: err.message,
        invoiceExtraDirty: true,
        invoiceExtraLoading: false
      });
    }
  }

  renderInvoices() {
    const { invoices } = this.state;

    if (!invoices) {
      return <div>Fetching Invoices...</div>;
    }

    if (invoices.length === 0) {
      return <div>No invoices yet</div>;
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => {
            const date = moment(invoice.date).format('MMMM D');
            return (
              <tr key={invoice.id}>
                <td>
                  {date}
                </td>
                <td>${(invoice.total / 100).toFixed(2)}</td>
                <td>
                  {invoice.paid ? (
                    <span style={{ color: '#0A0' }}>Paid</span>
                  ) : (
                    <span style={{ color: '#AAA' }}>Pending</span>
                  )}
                </td>
                <td className="center">
                  {invoice.paid ? (
                    <button
                      className="button button--super-compact"
                      onClick={this._handleDownloadInvoice.bind(
                        this,
                        invoice.id
                      )}>
                      Download
                    </button>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    const {
      invoiceExtra,
      invoiceExtraLoading,
      invoiceExtraError,
      invoiceExtraDirty,
      hasSaved
    } = this.state;

    let btnText = '';
    if (invoiceExtraLoading) {
      btnText = 'Updating...';
    } else if (hasSaved && !invoiceExtraDirty) {
      btnText = 'Updated';
    } else {
      btnText = 'Save';
    }

    return (
      <div>
        {this.renderInvoices()}
        <hr />
        <form onSubmit={this._handleInvoiceExtraSubmit.bind(this)}>
          <div className="form-control">
            <label>
              Additional Information to Include (Address, VAT, etc)
              <textarea
                rows="5"
                value={invoiceExtra}
                onChange={this._handleInvoiceExtraChange.bind(this)}
              />
            </label>
          </div>
          {invoiceExtraError && (
            <div className="form-control error">** {invoiceExtraError}</div>
          )}
          <div className="form-control right">
            <button
              className="button"
              disabled={!invoiceExtraDirty || invoiceExtraLoading}>
              {btnText}
            </button>
          </div>
        </form>
      </div>
    );

    return <div>{invoiceTable}</div>;
  }
}

Invoices.propTypes = {
  whoami: PropTypes.shape({
    email: PropTypes.string.isRequired,
    invoiceExtra: PropTypes.string.isRequired
  }).isRequired
};

export default () => (
  <App title="Invoices" subTitle="View past invoices">
    {props => <Invoices {...props} />}
  </App>
);
