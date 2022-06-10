import { INotifier } from '../../interfaces/INotifier';
import { IProxy } from '../../interfaces/IProxy';
import { Notifier } from '../../patterns/observer/Notifier';

/**
 * A base <code>IProxy</code> implementation. 
 *
 * In PureMVC, <code>IProxy</code> implementors assume these responsibilities:
 * <UL>
 * <LI>Implement a common method which returns the name of the <code>Proxy</code>.
 * <LI>Provide methods for setting and getting the data object.
 *
 * Additionally, <code>IProxy</code> typically:
 * <UL>
 * <LI>Maintain references to one or more pieces of model data.
 * <LI>Provide methods for manipulating that data.
 * <LI>Generate <code>INotification</code>s when their model data changes.
 * <LI>Expose their name as a <code>constant</code> called <code>NAME</code>, if they are not
 * instantiated multiple times.
 * <LI>Encapsulate interaction with local or remote services used to fetch and persist model
 * data.
 */
export class Proxy<T = any>
	extends Notifier
	implements IProxy, INotifier {
	/**
	 * The name of the <code>Proxy</code>.
	 */
	protected proxyName: string = null;

	/**
	 * The data object controlled by the <code>Proxy</code>.
	 */
	protected data: T = null;

	/**
	 * Constructs a <code>Proxy</code> instance.
	 *
	 * @param proxyName
	 * 		The name of the <code>Proxy</code> instance.
	 *
	 * @param data
	 * 		An initial data object to be held by the <code>Proxy</code>.
	 */
	constructor(proxyName: string = null, data: T = null) {
		super();

		this.proxyName = (proxyName != null) ? proxyName : Proxy.NAME;

		if (data != null) {
			this.setData(data);
		}
	}

	/**
	 * Get the name of the <code>Proxy></code> instance.
	 *
	 * @return
	 * 		The name of the <code>Proxy></code> instance.
	 */
	getProxyName(): string {
		return this.proxyName;
	}

	/**
	 * Set the data of the <code>Proxy></code> instance.
	 *
	 * @param data
	 * 		The data to set for the <code>Proxy></code> instance.
	 */
	setData(data: T): void {
		this.data = data;
	}

	/**
	 * Get the data of the <code>Proxy></code> instance.
	 *
	 * @return
	 * 		The data held in the <code>Proxy</code> instance.
	 */
	getData(): T {
		return this.data;
	}

	/**
	 * Called by the Model when the <code>Proxy</code> is registered. This method has to be
	 * overridden by the subclass to know when the instance is registered.
	 */
	onRegister(): void {
		// no-op
	}

	/**
	 * Called by the Model when the <code>Proxy</code> is removed. This method has to be
	 * overridden by the subclass to know when the instance is removed.
	 */
	onRemove(): void {
		// no-op
	}

	/**
	 * The default name of the <code>Proxy</code>
	 * 
	 * @type
	 * @constant
	 */
	static NAME = 'Proxy';
}
