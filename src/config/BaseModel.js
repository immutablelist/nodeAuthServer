import { Model, ValidationError } from 'objection';
import { validate } from '../../services/utils/validator';

class BaseModel extends Model {

	static timestamp = true;

	/**
	 * Custom $validate function which uses
	 * JOI
	 * @param objectToValidate
	 * @param options
	 * @returns {*|BaseModel}
	 */
	$validate(objectToValidate, options) {
		// This makes revalidation possible: `someModel.$validate()`.
		objectToValidate = objectToValidate || this;

		const { schema } = this.constructor;

		if (!schema) {
			return objectToValidate;
		}

		const errors = validate(schema, objectToValidate);

		if (!errors) {
			return objectToValidate;
		}

		throw new ValidationError(errors);
	}

	/**
	 * Before Insert
	 */
	$beforeInsert() {
		this._addTimestamp('create');
	}

	/**
	 * Before Update
	 */
	$beforeUpdate() {
		this._addTimestamp('update');
	}

	/**
	 * Add timestamp if enabled
	 * from the property
	 * @param action
	 * @private
	 */
	_addTimestamp(action) {
		if (this.constructor.timestamp) {
			switch (action) {
				case 'create':
					this.created_at = new Date().toISOString();
					break;
				case 'update':
					this.updated_at = new Date().toISOString();
					break;
			}
		}
	}
}

export default BaseModel;
