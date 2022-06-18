import React from 'react'

function contact() {
    return (
        <div className="contact container text-center">
            <h1>Contact Us</h1>
            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-6 my-5">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="Input1" className="form-label">Name</label>
                            <input type="text" className="form-control" id="Input1" placeholder="John Doe" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Input2" className="form-label">Email</label>
                            <input type="email" className="form-control" id="Input2" placeholder="name@example.com" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Input3" className="form-label">Message</label>
                            <textarea className="form-control" id="Input3" rows="3" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default contact