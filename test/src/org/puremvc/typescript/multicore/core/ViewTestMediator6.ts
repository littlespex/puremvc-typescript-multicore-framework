///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

///<reference path='../../../../../../src/org/puremvc/typescript/multicore/interfaces/IMediator.ts'/>

///<reference path='../../../../../../src/org/puremvc/typescript/multicore/patterns/mediator/Mediator.ts'/>

///<reference path='ViewTest.ts'/>

module puremvc
{
	"use strict";

	/**
	 * A Mediator class used by ViewTest.
	 */
	export class ViewTestMediator6
		extends Mediator
		implements IMediator
	{
		/**
		 * Constructs a <code>Mediator</code> subclass instance.
		 *
		 * @param mediatorName
		 * 		The name of the <code>Mediator</code>.
		 *
		 * @param view
		 * 		The view component handled by this <code>Mediator</code>.
		 */
		constructor( mediatorName:string, view:any )
		{
			super( mediatorName, view );
		}

		/**
		 * Standard getter to return the view handled by the <code>Mediator</code>.
		 *
		 * @return
		 * 		The view handled by the <code>Mediator</code>.
		 */
		getViewTest():any
		{
			return this.viewComponent;
		}

		/**
		 * @override
		 *
		 * @return
		 * 		The list of notifications names in which is interested the
		 * 		<code>Mediator</code>.
		 */
		listNotificationInterests():string[]
		{
			return [ ViewTest.NOTE6 ];
		}

		/**
		 * @override
		 *
		 * @param notification
		 * 		The notification instance to be handled.
		 */
		handleNotification( notification:INotification )
		{
			this.facade.removeMediator(this.getMediatorName());
		}

		/**
		 * @override
		 */
		onRemove()
		{
			this.getViewTest().counter++;
		}

		/**
		 * The Mediator name.
		 *
		 * @constant
		 */
		private static NAME:string = 'ViewTestMediator6';
	}
}