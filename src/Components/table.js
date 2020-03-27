import React, { Component } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: [
        { id: 1, name: 'Ahmet Aydın', email: 'ahmet@aydin.com', phone: '0533 333 00 22', city: { id: 34, name: 'İstanbul' } },
        { id: 2, name: 'Ali Yılmaz', email: 'ali@yilmaz.com', phone: '0533 333 11 33', city: { id: 34, name: 'İstanbul' } },
        { id: 3, name: 'Seda Yıldırım', email: 'seda@yildirim.com', phone: '0533 444 00 22', city: { id: 34, name: 'İstanbul' } },
        { id: 4, name: 'Aylin Erkan', email: 'aylin@erkan.com', phone: '0542 555 00 22', city: { id: 34, name: 'İstanbul' } },
        { id: 5, name: 'Mert Arıca', email: 'mert@arica.com', phone: '0534 123 45 67', city: { id: 34, name: 'İstanbul' } },
      ],
      selectedContact: {},
      displayDialog: false,
      cities: [
        { name: 'İstanbul', id: 34 },
        { name: 'İzmir', id: 35 },
        { name: 'Ankara', id: 6 },
        { name: 'Artvin', id: 8 },
        { name: 'Adana', id: 1 },
      ]
    }
  }


  getUpdateButton = (rowData, column) => {
    return (
      <div>
        <Button className="p-button-warning" label="Edit" onClick={() => { this.handleUpdateButton(rowData) }}>
        </Button>
      </div>)
  }

  handleUpdateButton = (item) => {
    this.setState({ selectedContact: { ...item }, displayDialog: true })
  }

  update = () => {
    const index = this.state.contacts.findIndex(item => item.id === this.state.selectedContact.id)
    if (index !== -1) {
      let tmpContacts = [...this.state.contacts]
      tmpContacts[index] = this.state.selectedContact;
      this.setState({ contacts: tmpContacts, displayDialog: false })
    }
  }

  discard = () => {
    this.setState({
      selectedContact: {}, displayDialog: false
    });
  }

  updateProperty(property, value) {
    console.log(property, value)
    let contact = this.state.selectedContact;
    contact[property] = value;
    this.setState({ selectedContact: contact });
  }

  render() {

    const dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
      <Button label="Discard" icon="pi pi-times" onClick={this.discard} />
      <Button label="Update" icon="pi pi-check" onClick={this.update} />
    </div>;

    return (
      <>
        <DataTable value={this.state.contacts} paginator={true} rows={15}>
          <Column field="name" header="Name" />
          <Column field="email" header="E-Mail" />
          <Column field="phone" header="Phone" />
          <Column field="city.name" header="City" />
          <Column header="Güncelle" body={this.getUpdateButton} />
        </DataTable>

        <Dialog visible={this.state.displayDialog} width="300px" header="Contact Details" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
          <div className="p-grid p-fluid">
            <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="name">Name</label></div>
            <div className="p-col-8" style={{ padding: '.5em' }}>
              <InputText id="name" onChange={(e) => { this.updateProperty('name', e.target.value) }} value={this.state.selectedContact.name} />
            </div>

            <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="email">Email</label></div>
            <div className="p-col-8" style={{ padding: '.5em' }}>
              <InputText id="email" onChange={(e) => { this.updateProperty('email', e.target.value) }} value={this.state.selectedContact.email} />
            </div>

            <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="phone">Phone</label></div>
            <div className="p-col-8" style={{ padding: '.5em' }}>
              <InputText id="phone" onChange={(e) => { this.updateProperty('phone', e.target.value) }} value={this.state.selectedContact.phone} />
            </div>

            <div className="p-col-4" style={{ padding: '.75em' }}><label htmlFor="city">City</label></div>
            <div className="p-col-8" style={{ padding: '.5em' }}>
              <Dropdown id="city" value={this.state.selectedContact.city} options={this.state.cities} onChange={(e) => { this.updateProperty('city', e.target.value) }} optionLabel="name" placeholder="Select a City" />
            </div>
          </div>
        </Dialog>
      </>
    )
  }
}

export default Table;