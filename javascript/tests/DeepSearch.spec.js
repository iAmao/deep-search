import chai from 'chai';
import nested from '../example/nested';
import DeepSearch from '../DeepSearch';

const expect = chai.expect;


describe('DeepSearch', () => {
  let deepSearch;

  beforeEach(() => {
    deepSearch = new DeepSearch(nested);
  });

  describe('constructor', () => {
    it('should create the new instance with the nested object', () => {
      expect(deepSearch.obj).to.eql(nested);
    });

    it('should define the instance with a default empty object', () => {
      const testDeepSearch = new DeepSearch();
      expect(testDeepSearch.obj).to.eql({});
    });
  });

  describe('searchKey', () => {
    it('should return the value of the input key', () => {
      expect(deepSearch.searchKey('dany')).to.eql('drogon');
    });
    it('should return a message if key is not found', () => {
      expect(deepSearch.searchKey('e')).to.eql('Not Found');
    });
    it('should return an error for an invalid field', () => {
      expect(deepSearch.searchKey('')).to.eql('Input Error');
    });
    it('should return an error for an invalid object', () => {
      expect(deepSearch.searchKey('key', {})).to.eql('Input Error');
    });
  });

  describe('validateInput', () => {
    it('should return true on a valid string input', () => {
      expect(DeepSearch.validateInput('one', 'string')).to.eql(true);
    });
    it('should return false on an invalid string input', () => {
      expect(DeepSearch.validateInput('', 'string')).to.eql(false);
    });
    it('should return true on a valid object input', () => {
      expect(DeepSearch.validateInput({ one: 'valid' }, 'object')).to.eql(true);
    });
    it('should return false on an invalid object input', () => {
      expect(DeepSearch.validateInput({}, 'object')).to.eql(false);
    });
  });
});
