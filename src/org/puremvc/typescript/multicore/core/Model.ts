import { IModel } from '../interfaces/IModel';
import { IProxy } from '../interfaces/IProxy';

/**
 * Error message used to indicate that a <code>Model</code> singleton instance is
 * already constructed for this multiton key.
 */
export const MULTITON_MSG = 'Model instance for this multiton key already constructed!';

/**
 * The <code>Model</code> class for PureMVC.
 *
 * A multiton <code>IModel</code> implementation.
 *
 * In PureMVC, the <code>IModel</code> class provides access to model objects
 * <code>Proxies</code> by named lookup.
 *
 * The <code>Model</code> assumes these responsibilities:
 * <UL>
 * <LI>Maintain a cache of <code>IProxy</code> instances.
 * <LI>Provide methods for registering, retrieving, and removing <code>Proxy</code> instances.
 *
 * Your application must register <code>IProxy</code> instances with the <code>Model</code>.
 * Typically, you use an <code>ICommand</code> to create and register <code>Proxy</code> instances
 * once the <code>Facade</code> has initialized the core actors.
 */
export class Model implements IModel {
	/**
	 * HashTable of <code>IProxy</code> registered with the <code>Model</code>.
	 */
	protected proxyMap: Record<string, IProxy> = null;

	/**
	 * The multiton key for this core.
	 */
	protected multitonKey: string = null;

	/**
	 * This <code>IModel</code> implementation is a multiton, so you should not call the
	 * constructor directly, but instead call the static multiton Factory method
	 * <code>Model.getInstance( key )</code>.
	 * 
	 * @param key
	 *		Multiton key for this instance of <code>Model</code>.
	 *
	 * @throws Error
	 * 		Throws an error if an instance for this multiton key has already been constructed.
	 */
	constructor(key: string) {
		if (Model.instanceMap[key]) {
			throw Error(MULTITON_MSG);
		}

		Model.instanceMap[key] = this;
		this.multitonKey = key;
		this.proxyMap = {};

		this.initializeModel();
	}

	/**
	 * Initialize the multiton <code>Model</code> instance.
	 *
	 * Called automatically by the constructor. This is the opportunity to initialize the
	 * multiton instance in a subclass without overriding the constructor.
	 */
	initializeModel(): void {
		// no-op
	}

	/**
	 * Register an <code>IProxy</code> with the <code>Model</code>.
	 * 
	 * @param proxy
	 *		An <code>IProxy</code> to be held by the <code>Model</code>.
	 */
	registerProxy(proxy: IProxy): void {
		proxy.initializeNotifier(this.multitonKey);
		this.proxyMap[proxy.getProxyName()] = proxy;
		proxy.onRegister();
	}

	/**
	 * Remove an <code>IProxy</code> from the <code>Model</code>.
	 *
	 * @param proxyName
	 *		The name of the <code>Proxy</code> instance to be removed.
	 *
	 * @return
	 *		The <code>IProxy</code> that was removed from the <code>Model</code> or an
	 *		explicit <code>null</null> if the <code>IProxy</code> didn't exist.
	 */
	removeProxy(proxyName: string): IProxy {
		const proxy: IProxy = this.proxyMap[proxyName];
		if (proxy) {
			delete this.proxyMap[proxyName];
			proxy.onRemove();
		}

		return proxy;
	}

	/**
	 * Retrieve an <code>IProxy</code> from the <code>Model</code>.
	 * 
	 * @param proxyName
	 *		 The <code>IProxy</code> name to retrieve from the <code>Model</code>.
	 *
	 * @return
	 *		The <code>IProxy</code> instance previously registered with the given
	 *		<code>proxyName</code> or an explicit <code>null</code> if it doesn't exists.
	 */
	retrieveProxy(proxyName: string): IProxy {
		//Return a strict null when the proxy doesn't exist
		return this.proxyMap[proxyName] || null;
	}

	/**
	 * Check if an <code>IProxy</code> is registered.
	 * 
	 * @param proxyName
	 *		The name of the <code>IProxy</code> to verify the existence of its registration.
	 *
	 * @return
	 *		A Proxy is currently registered with the given <code>proxyName</code>.
	 */
	hasProxy(proxyName: string): boolean {
		return this.proxyMap[proxyName] != null;
	}

	/**
	 * <code>Model</code> singleton instance map.
	 */
	protected static instanceMap: Record<string, IModel> = {};

	/**
	 * <code>Model</code> multiton factory method.
	 *
	 * @param key
	 *		The multiton key of the instance of <code>Model</code> to create or retrieve.
	 *
	 * @return
	 * 		The singleton instance of the <code>Model</code>.
	 */
	static getInstance(key: string): IModel {
		if (!Model.instanceMap[key])
			Model.instanceMap[key] = new Model(key);

		return Model.instanceMap[key];
	}

	/**
	 * Remove a <code>Model</code> instance
	 * 
	 * @param key
	 *		Multiton key identifier for the <code>Model</code> instance to remove.
	 */
	static removeModel(key: string): void {
		delete Model.instanceMap[key];
	}
}
