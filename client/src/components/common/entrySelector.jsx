import React, { Component } from "react";
import { withTranslation } from "react-i18next";
class EntrySelector extends Component {
  state = { entryOptions: [1, 2, 3], isOpen: false };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { pageSize, onEntriesChange, onPageChange, t } = this.props;
    const { entryOptions, isOpen } = this.state;

    const menuClass = `dropdown-menu${isOpen ? " show" : ""}`;

    return (
      <div className="dropdown m-3" onClick={this.toggleOpen}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="showEntriesDropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {t("showing")} {pageSize} {t("entries")}
        </button>
        <div className={menuClass} aria-labelledby="showEntriesDropdown">
          {entryOptions.map((option) => (
            <button
              key={option}
              className="dropdown-item"
              type="button"
              onClick={() => {
                onEntriesChange(option);
                onPageChange(1);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default withTranslation()(EntrySelector);
