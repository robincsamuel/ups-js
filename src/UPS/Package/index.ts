import Resource from '../Resource';
import Packages from './packages';

// UPS doesn't have a package api, this mimics an async fn to return hardcoded data

class Package extends Resource {
  public async list(): Promise<any[]> {
    return Packages;
  }
}

export default Package;
